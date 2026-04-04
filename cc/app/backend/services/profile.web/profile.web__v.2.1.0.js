/**
 * Page Code: Auth Gate 2.0
 * Path: /page_code/marketing/auth-gate.js
 * Version: [Auth Gate: v2.1.0]
 * Description: Identity-driven routing hub with enhanced UX and error recovery.
 */

import wixLocation from 'wix-location';
import { checkMemberExists } from 'backend/services/profile.web.js';
import { showToaster } from 'public/utils/notification';
import { validateEmail, safeDisable, safeShow, safeHide } from 'public/utils/validation';

// 1. Configuration Constants
const PATH_HUB = "/dashboard/profilesetting";
const PATH_ACQUISITION = "/pricing-plans";
const LOG_PREFIX = "[Auth Gate: v2.1.0]";

$w.onReady(() => {
    console.info(`${LOG_PREFIX} Gateway Initialized. Systems Nominal.`);
    wireEventHandlers();
});

/**
 * Standardizes event listener attachment for the gateway.
 */
function wireEventHandlers() {
    // Primary Action
    $w("#memberCheck").onClick(async () => {
        await executeIdentityRouting();
    });

    // UX: Enable "Enter" key for streamlined business workflow
    $w("#memberEmail").onKeyPress((event) => {
        if (event.key === "Enter") executeIdentityRouting();
    });
}

/**
 * The core 'Fork in the Road' logic.
 */
async function executeIdentityRouting() {
    const rawEmail = $w("#memberEmail").value;
    const email = rawEmail ? rawEmail.trim() : "";

    // 1. Client-Side Validation Gate
    if (!validateEmail(email)) {
        showToaster("Please enter a valid business email address.", "error");
        $w("#memberEmail").updateValidityIndication();
        return;
    }

    // 2. State Transition: Loading
    setProcessingState(true);

    try {
        console.log(`${LOG_PREFIX} Dispatching identity check for: ${email}`);

        // 3. Service Call (Backend v2.1.0)
        const response = await checkMemberExists(email);

        if (!response.ok) {
            throw new Error(response.error || "IDENTITY_SERVICE_TIMEOUT");
        }

        // 4. Deterministic Routing
        if (response.exists) {
            console.info(`${LOG_PREFIX} Identity confirmed. Routing to Persistent Hub.`);
            navigateTo(PATH_HUB);
        } else {
            console.info(`${LOG_PREFIX} No identity found. Routing to Acquisition.`);
            navigateTo(PATH_ACQUISITION);
        }

    } catch (err) {
        // 5. Resilience: Log failure and provide a safe fallback path
        console.error(`${LOG_PREFIX} Routing Engine Failure:`, err);
        
        showToaster("Connection interrupted. Redirecting to onboarding...", "error");
        
        // Safety Fallback: Default to pricing/onboarding to prevent dead-end UX
        setTimeout(() => navigateTo(PATH_ACQUISITION), 1500);

    } finally {
        setProcessingState(false);
    }
}

/**
 * Robust navigation wrapper to handle potential environment-specific failures.
 */
function navigateTo(path) {
    try {
        wixLocation.to(path);
    } catch (err) {
        console.error(`${LOG_PREFIX} Critical Navigation Error:`, err);
        // Manual fallback if automatic redirect fails in specific browsers
        showToaster("Please click 'Continue' to proceed manually.", "info");
    }
}

/**
 * Manages UI feedback states to prevent race conditions and double-submissions.
 */
function setProcessingState(isProcessing) {
    if (isProcessing) {
        safeDisable("#memberCheck", true);
        $w("#memberCheck").label = "Verifying...";
        safeShow("#ccPreCheckLoader"); // Visual spinner/bar
    } else {
        safeDisable("#memberCheck", false);
        $w("#memberCheck").label = "Continue";
        safeHide("#ccPreCheckLoader");
    }
}