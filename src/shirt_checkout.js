var userKey;
var shirtSize;
var shirtColor;
var shirtGender;
var timer = 10;

$(document).ready(function () {
    userKey = getHttpParameter("ukey");
    shirtSize = getHttpParameter("shirt_size");
    shirtColor = getHttpParameter("shirt_color");
    shirtGender = getHttpParameter("shirt_gender");

    if (userKey != null && userKey !== undefined) {
        countDown();
    } else {
        debuglog("important parameters missing - cannot redirect to shirt checkout!");
        $('#countdown').text("Sorry - your shirt parameters are missing. Try again starting at the result page or contact us.");
    }
});

function countDown() {
    if (timer >= 0) {
        $('#countdown').text(timer);
        debuglog("countdown... " + timer);
        timer--;
        setTimeout(countDown, "1000");
    } else {
        gotoShirtCheckout();
    }
}

function gotoShirtCheckout() {
    debuglog("checkoutShirt for: " + userKey);
    $('body').css('cursor', 'wait');
    $.post("./php/buildShirtBasketItemInShop.php", {
        ukey: userKey,
        shirt_size: shirtSize,
        shirt_color: shirtColor,
        shirt_gender: shirtGender
    }).done(function (data, status) {
        debuglog("checkoutShirt - status: " + status + "; with url to checkout: " + data['0']);
        relocate(data['0']);
    }).fail(function (err) {
        debuglog("error creating spreadshirt basket item: " + err.responseText);
        $('body').css('cursor', 'auto');
    });
}

function relocate(url) {
    $(location).attr('href', url);
}
