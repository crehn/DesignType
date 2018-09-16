// 1=white, 2=black, 5=red, 4=navy, 17=royalblue, 231=heather grey, 120=brown, 88=grass green, 85=aqua, 
// 129=asphalt 464=forest green, 146=light blue, 99=pink, 130=army, 114=lemon, 135=gold, 143=raspberry, 
// 121=grey, 277=purple, 15=lime, 219, deep mint gibt es nicht mehr
var shirtColor = 4;
// 2=S, 3=M, 4=L, 5=XL, 6=XXL, 38=3XL
var shirtSize = 4;
var male = true;
var country = 1;

function changeShirtSize(newSize) {
    shirtSize = newSize;
    debuglog("new shirt size: " + shirtSize);
}

function activateShirtSizeBtn(activeElementId) {
    $(".btn-size-select").removeClass("btn-size-active");
    $(activeElementId).addClass("btn-size-active");
    debuglog("activated shirt size btn element with id: " + activeElementId);
}

function changeShirtColor(newColor) {
    var colorToSet = 0;
    // if switch of male to female for royal blue switch color code
    if (male && newColor == 258) {
        colorToSet = 17;
        debuglog("switch color: " + colorToSet);
    } else if (!male && newColor == 17) {
        colorToSet = 258;
        debuglog("switch shirt color: " + colorToSet);
    } else {
        colorToSet = newColor;
    }
    shirtColor = colorToSet;
    debuglog("new shirt color: " + colorToSet);
    // change bg color of shirt
    var gender_extension = male ? "" : "_fem";
    var newClazz = "shirt_bg shirt_bg_" + colorToSet + gender_extension;
    $("#shirt_display").attr('class', newClazz);
}

function activateShirtColorBtn(activeElementId) {
    $(".btn-clr-select").removeClass("btn-clr-select-active");
    $(activeElementId).addClass("btn-clr-select-active");
    debuglog("activated shirt color btn element with id: " + activeElementId);
}

function changeHomeCountry(newCountry) {
    country = newCountry;
    debuglog("new country: " + newCountry);
}

function createShirtImage(resultType, userkey) {
    debuglog("createShirtImage for: " + userkey);
    $.post("./php/buildResultImageForShirt.php", { ukey: userkey, restype: resultType })
        .done(function (data, status) {
            debuglog("createShirtImage - status: " + status + "; with result path to image: " + data);
            // change the overlay image by current created one
            var newImgSrc = "./php/shirtorders/" + userkey + ".png";
            $(".overlay-img").attr('src', newImgSrc);
            debuglog("set new img src: " + newImgSrc);
        })
        .fail(function (err) {
            debuglog("error creating spreadshirt image: " + err.responseText);
        });
}

function checkoutShirt(userkey) {
    debuglog("checkoutShirt for: " + userkey);
    var shipCountry = $('#shipping_country').val();
    var shirtGender = $('#shirt_gender').val();
    debuglog("checkout shirt for userkey: " + userkey + "; shirt Size: " + shirtSize + "; shirt color: " + shirtColor + "; ship country: " + shipCountry + "; shirt gender: " + shirtGender);

    var checkOutUrl = "shirt_checkout.html?ukey=" + userkey + "&shirt_size=" + shirtSize + "&shirt_color=" + shirtColor + "&shirt_gender=" + shirtGender + "&ship_country=" + shipCountry;
    debuglog("call url in new window: " + checkOutUrl);
    window.open(checkOutUrl, "_blank");
}

function initSpreadshirtFunctions(resultType, userkey) {
    // build result image for spread shirt
    createShirtImage(resultType, userkey);

    // size buttons
    // 2=S, 3=M, 4=L, 5=XL, 6=XXL, 38=3XL
    $("#size_s").on('click', function () {
        changeShirtSize(2);
        activateShirtSizeBtn("#size_s");
    });
    $("#size_m").on('click', function () {
        changeShirtSize(3);
        activateShirtSizeBtn("#size_m");
    });
    $("#size_l").on('click', function () {
        changeShirtSize(4);
        activateShirtSizeBtn("#size_l");
    });
    $("#size_xl").on('click', function () {
        changeShirtSize(5);
        activateShirtSizeBtn("#size_xl");
    });
    $("#size_xxl").on('click', function () {
        changeShirtSize(6);
        activateShirtSizeBtn("#size_xxl");
    });
    $("#size_3xl").on('click', function () {
        changeShirtSize(38);
        activateShirtSizeBtn("#size_3xl");
    });

    // shirt color buttons
    // 1=white, 2=black, 5=red, 4=navy, 17=royalblue but 258 for women, 231=heather grey, 120=brown, 88=grass green, 85=aqua,
    // 129=asphalt 464=forest green, 146=light blue, 99=pink, 130=army, 114=lemon, 135=gold, 143=raspberry, 
    // 121=grey, 277=purple, 15=lime, 219, deep mint
    $("#color_white").on('click', function () {
        changeShirtColor(1);
        activateShirtColorBtn("#color_white");
    });
    $("#color_black").on('click', function () {
        changeShirtColor(2);
        activateShirtColorBtn("#color_black");
    });
    $("#color_royalblue").on('click', function () {
        changeShirtColor(17);
        activateShirtColorBtn("#color_royalblue");
    });
    $("#color_navy").on('click', function () {
        changeShirtColor(4);
        activateShirtColorBtn("#color_navy");
    });
    $("#color_divablue").on('click', function () {
        changeShirtColor(388);
        activateShirtColorBtn("#color_divablue");
    });
    $("#color_kellygreen").on('click', function () {
        changeShirtColor(92);
        activateShirtColorBtn("#color_kellygreen");
    });
    $("#color_red").on('click', function () {
        changeShirtColor(5);
        activateShirtColorBtn("#color_red");
    });
    $("#color_heathergrey").on('click', function () {
        changeShirtColor(231);
        activateShirtColorBtn("#color_heathergrey");
    });

    // gender combobox
    $("#shirt_gender").change(function () {
        var curGender = $("#shirt_gender").val();
        male = (curGender == "male") ? true : false;
        if (male) {
           $("#size_3xl").show();
        } else {
           $("#size_3xl").hide();
           if (shirtSize == 38) { // in case 3XL was selected to avoid that nothing is selected
              changeShirtSize(3);
              activateShirtSizeBtn("#size_m");
           }
        }
        changeShirtColor(shirtColor); // just redraw with current color
    });


    // checkout button
    $("#checkout").on('click', function () {
        checkoutShirt(userkey);
    });
}