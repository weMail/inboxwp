;(
    function ($) {
        $(document).ready(function () {
            $('#inboxwp-email-ignore-notice .notice-dismiss').on('click', function () {
                setCookie('inboxwp-email-ignore-notice', 1, 10800); // 3 hours
            });
        });
    }
)(jQuery);

function setCookie(name, value, expiryInSeconds) {
    console.log(name, value, expiryInSeconds);
    var expires = "";

    if (expiryInSeconds) {
        var date = new Date();
        date.setTime(date.getTime() + (expiryInSeconds *1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}