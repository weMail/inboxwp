;(
    function ($) {
        $(document).ready(function () {
            $('#inboxwp-email-ignore-notice .notice-dismiss').on('click', function () {
                $('.modal-wrapper').fadeIn();

            });

            $(window).click(function(event) {
                if (event.target.id === "inboxwp-email-ignore-modal") {
                    $(".modal-wrapper").fadeOut();
                    window.location.reload();
                }
            });

            $('#remind-me-14days-later').on('click', function () {
                setCookie('inboxwp_email_ignore_notice', 'true', 20160);
                $(".modal-wrapper").fadeOut();
            });

            $('#never-remind-me').on('click', function () {
                setCookie('inboxwp_email_ignore_notice', 'true', 525600);
                $(".modal-wrapper").fadeOut();
            });
        });
    }
)(jQuery);

function setCookie(name, value, expiryInMinutes) {
    console.log(name, value, expiryInMinutes);
    var expires = "";

    if (expiryInMinutes) {
        var date = new Date();
        date.setTime(date.getTime() + (expiryInMinutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}