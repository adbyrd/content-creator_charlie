/**
 * Page: Project Detail (Dynamic)
 * Path: /projects/{_id}
 * Version: [Project Detail: v1.4.0]
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
    // The dynamic dataset automatically filters by the ID in the URL
    $w('#dynamicDataset').onReady(() => {
        const currentProject = $w('#dynamicDataset').getCurrentItem();
        
        if (!currentProject) {
            console.error("[Project Detail: v1.4.0] Project record not found.");
            wixLocation.to("/projects"); // Fallback if record is missing
            return;
        }

        console.log(`[Project Detail: v1.4.0] Viewing Project: ${currentProject.title}`);
        setupPageUI(currentProject);
    });
});

/**
 * Custom UI logic (e.g., breadcrumbs or dynamic labels)
 */
function setupPageUI(data) {
    // Example: Update page title or breadcrumb
    $w('#txtBreadcrumb').text = `Projects / ${data.title}`;
    
    // Wire up a back button
    $w('#btnBack').onClick(() => {
        wixLocation.to("/projects");
    });
}