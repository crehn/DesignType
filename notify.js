function setNotificationOptions(event, notifyOption) {
    $('#notify-error').hide();
    $('#notify-success').hide();

    if (!document.querySelector('form').checkValidity()) {
        return;
    }

    event.preventDefault();
    debuglog("set notification options: " + notifyOption);

    $.ajax({
        method: "POST",
        url: "php/setNotificationOptions.php",
        contentType: 'application/json',
        data: JSON.stringify({
            email: $('form input[type=email]').val(),
            notifyOption: notifyOption
        }),
        success: function () {
            debuglog("notification options successfully set");
            $('#notify-success').show('fast');
            $('#notify-error').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            debuglog("notification options failed: " + textStatus + " - " + errorThrown);
            $('#notify-error').show('fast');
            $('#notify-success').hide();
        },
    });
}
