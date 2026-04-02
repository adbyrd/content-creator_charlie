/**
 * Utility: Notifications
 * Path: /public/utils/notifications.js
 */

export function showToaster(message, type = 'success') {
    const $toaster = $w('#globalToaster');
    const $text = $w('#toasterMsg');

    if (!$toaster || !$text) return;

    $text.text = message;

    if ($toaster.style) {
        $toaster.style.backgroundColor = (type === 'success') ? "#7bef8593" : "#FFEBEE";
    }

    $toaster.expand()
        .then(() => {
            setTimeout(() => {
                $toaster.collapse();
            }, 4000);
        });
}