var userKey;
var shirtSize;
var shirtColor;
var shirtGender;
var shipCountry;
var timer = 10;

function countDown() {
    if (timer >= 0) {
        $('#countdown').text(timer);
        debuglog("countdown... " + timer);
        timer--;
        setTimeout(countDown, "1000");
    } else {
        checkoutShirt();
    }
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function checkoutShirt() {
    debuglog("checkoutShirt for: " + userKey);
    $('#wholebody').css('cursor', 'wait');
    $.post("./php/buildShirtBasketItemInShop.php", { ukey: userKey, shirt_size: shirtSize, shirt_color: shirtColor, ship_country: shipCountry, shirt_gender: shirtGender })
        .done(function (data, status) {
            debuglog("checkoutShirt - status: " + status + "; with url to checkout: " + data['0']);
            // relocate to checkout page
            $(location).attr('href', data['0']);
        })
        .fail(function (err) {
            debuglog("error creating spreadshirt basket item: " + err.responseText);
            $('#wholebody').css('cursor', 'auto');
        });
}

$(document).ready(function(){
    userKey = getHttpParameter("ukey");
    shirtSize = getHttpParameter("shirt_size");
    shirtColor = getHttpParameter("shirt_color");
    shirtGender = getHttpParameter("shirt_gender");
    shipCountry = getHttpParameter("ship_country");

    if (userKey != null && userKey !== undefined) {
        countDown();
    } else {
    	debuglog("important parameters missing - cannot redirect to shirt checkout!");
    	$('#countdown').text("Sorry - your shirt parameter are missing. Try again starting at the result page or contact us.");
    }
});
