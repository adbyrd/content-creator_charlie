/**
 * Utility: Shared UI Logic
 * Path: /public/utils/ui.js
 */

export function showModalError(message, pageObject) {
    const $container = pageObject('#errorContainer');
    const $text = pageObject('#errorModalMsg');

    if ($container && $text) {
        $text.text = message;
        
        if (typeof $container.expand === 'function') {
            $container.expand();
            console.log(`[cc-ui] Error displayed: ${message}`);
        }

        setTimeout(() => {
            if (typeof $container.collapse === 'function') {
                $container.collapse();
            }
        }, 5000);
    } else {
        console.warn(`[cc-ui] Error elements missing in this modal scope.`);
    }
}