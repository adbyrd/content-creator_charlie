/**
 * Backend Service: Profile & Identity Management
 * Path: /backend/services/profile.web.js
 * Version: [ PROFILE SERVICE : v.2.2.0 ]
 */

import { webMethod, Permissions } from 'wix-web-module';
import wixData from 'wix-data';
import { currentMember } from 'wix-members-backend';

const PROFILES_COLLECTION = 'profiles'; 
const MAX_RETRIES = 3;
const VERSION = "[ PROFILE SERVICE : v.2.2.0 ]";

async function executeQueryWithRetry(query, options = { suppressAuth: true }, attempts = 1) {
    try {
        return await query.find(options);
    } catch (err) {
        if (attempts < MAX_RETRIES) {
            const delay = Math.pow(2, attempts) * 100 + (Math.random() * 50);
            console.warn(`${VERSION} Query failed. Retrying in ${Math.round(delay)}ms... (Attempt ${attempts})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return executeQueryWithRetry(query, options, attempts + 1);
        }
        throw err;
    }
}

export const checkMemberExists = webMethod(Permissions.Anyone, async (email) => {
    try {
        if (!email) {
            console.warn(`${VERSION} checkMemberExists called without email.`);
            return { ok: false, error: "EMAIL_REQUIRED" };
        }

        const query = wixData.query(PROFILES_COLLECTION).eq("companyEmail", email);
        const { items } = await executeQueryWithRetry(query);

        const exists = items.length > 0;
        console.log(`${VERSION} Identity check for ${email}: ${exists ? 'FOUND' : 'NOT_FOUND'}`);

        return { ok: true, exists };
    } catch (err) {
        console.error(`${VERSION} Identity check failed:`, err);
        return { ok: false, error: err.message };
    }
});

export const getProfile = webMethod(Permissions.Anyone, async () => {
    try {
        const memberId = await getCurrentMemberId();
        if (!memberId) {
            console.warn(`${VERSION} Unauthorized access attempt to getProfile.`);
            return { ok: false, error: 'AUTH_REQUIRED' };
        }

        const query = wixData.query(PROFILES_COLLECTION).eq("_owner", memberId);
        const { items } = await executeQueryWithRetry(query);

        console.log(`${VERSION} Profile retrieved for owner: ${memberId}`);
        return { ok: true, data: items[0] || null };
    } catch (err) {
        console.error(`${VERSION} Error retrieving profile:`, err);
        return { ok: false, error: err.message };
    }
});

export const updateProfile = webMethod(Permissions.Anyone, async (payload) => {
    try {
        const memberId = await getCurrentMemberId();
        if (!memberId) {
            console.warn(`${VERSION} Unauthorized updateProfile attempt.`);
            return { ok: false, error: "AUTH_REQUIRED" };
        }

        // 1. Fetch current record
        const query = wixData.query(PROFILES_COLLECTION).eq('_owner', memberId);
        const currentRes = await executeQueryWithRetry(query);

        if (currentRes.items.length === 0) {
            console.error(`${VERSION} Update failed: No profile found for ${memberId}`);
            throw new Error("PROFILE_NOT_FOUND");
        }

        const original = currentRes.items[0];
        
        // 2. Defensive Merge (Only allow specific fields from payload.profile)
        const updateData = {
            ...original,
            ...(payload.profile || {}),
            _id: original._id, // Lock ID
            _owner: memberId   // Force ownership
        };

        const result = await wixData.update(PROFILES_COLLECTION, updateData, { suppressAuth: true });
        
        console.log(`${VERSION} Profile updated for owner: ${memberId}`);
        return { ok: true, data: result };

    } catch (err) {
        console.error(`${VERSION} updateProfile failed:`, err);
        return { ok: false, error: err.message };
    }
});

async function getCurrentMemberId() {
    try {
        const member = await currentMember.getMember({ fieldsets: ['PUBLIC'] });
        return member ? member._id : null;
    } catch (err) {
        console.error(`${VERSION} Internal Identity retrieval failure:`, err);
        return null;
    }
}