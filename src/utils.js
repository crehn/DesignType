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

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$(function () {
    var a = 'esign-'; var b = 'ma'; var c = 'es.net'; var d = 'typ'; var e = 'il@d'; var f = 'ilto:ema';
    var result = b + f + e + a + d + c;
    $("a.feedback").attr('href', result);
    $("a.feedback.feedback-plain").text(result.substr(7));

    var z = '+49'; var y = '7879'; var x = '955'; var w = '173';
    $("#telephone").html(z + w + x + y);
});