var debug = true;

//################### Utils

function getHttpParameter(key) {
    var callUrl = window.location.search.substring(1);
    var urlVars = callUrl.split('&');
    for (var i = 0; i < urlVars.length; i++) {
        var nameValue = urlVars[i].split('=');
        if (nameValue[0] == key) {
            return nameValue[1];
        }
    }
}

function debuglog(msg) {
    if (debug) {
        console.log(msg);
    }
}

$(function () {
    $('.pop').on('click', function () {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');
    });
});
