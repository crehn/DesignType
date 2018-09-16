const Color = {
    WHITE: 1,
    HEATHER_GREY: 231,
    BLACK: 2,
    ROYAL_BLUE: 17,
    ROYAL_BLUE_FEMALE: 258,
    NAVY: 4,
    DIVA_BLUE: 388,
    KELLY_GREEN: 92,
    RED: 5,
};

const Size = {
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    XXXL: 38
};

var shirtColor = Color.NAVY;
var shirtSize = Size.L;
var male = true;

function initSpreadshirtFunctions(resultType, userkey) {
    createShirtImage(resultType, userkey);

    $(".shirt-config-size").on('click', function () {
        changeShirtSize(Size[this.dataset.size]);
        activateShirtSizeBtn(this);
    });

    $(".shirt-config-color").on('click', function () {
        changeShirtColor(this.dataset.color);
        activateShirtColorBtn(this);
    });

    $(".shirt-config-gender").change(function () {
        var curGender = $(".shirt-config-gender").val();
        male = (curGender === "male");
        if (male) {
            $("#size_3xl").show();
        } else {
            $("#size_3xl").hide();
            if (shirtSize == Size.XXXL) {
                changeShirtSize(Size.XXL);
                activateShirtSizeBtn("#size_xxl");
            }
        }
        changeShirtColor(); // just redraw with current color
    });

    // checkout button
    $("#checkout").on('click', function () {
        redirectToShirtCheckout(userkey);
    });
}

function createShirtImage(resultType, userkey) {
    debuglog("createShirtImage for: " + userkey);
    $.post("./php/buildResultImageForShirt.php", { ukey: userkey, restype: resultType })
        .done(function (data, status) {
            debuglog("createShirtImage - status: " + status + "; with result path to image: " + data);
            var newImgSrc = "./php/shirtorders/" + userkey + ".png";
            $(".overlay-img").attr('src', newImgSrc);
            debuglog("set new img src: " + newImgSrc);
        })
        .fail(function (err) {
            debuglog("error creating spreadshirt image: " + err.responseText);
        });
}

function changeShirtSize(newSize) {
    shirtSize = newSize;
    debuglog("new shirt size: " + shirtSize);
}

function activateShirtSizeBtn(activeElementId) {
    $(".shirt-config-size").removeClass("shirt-config-active");
    $(activeElementId).addClass("shirt-config-active");
}

function changeShirtColor(newColor) {
    if (newColor !== undefined) {
        shirtColor = getColorCode(newColor);
        debuglog("new shirt color: " + shirtColor);
    }
    var gender_extension = male ? "" : "_fem";
    var newClass = "shirt_bg shirt_bg_" + shirtColor + gender_extension;
    $("#shirt_display").attr('class', newClass);
}

function getColorCode(newColor) {
    if (!male && newColor === 'ROYAL_BLUE') {
        return Color.ROYAL_BLUE_FEMALE;
    } else {
        return Color[newColor];
    }
}

function activateShirtColorBtn(activeElementId) {
    $(".shirt-config-color").removeClass("shirt-config-active");
    $(activeElementId).addClass("shirt-config-active");
}

function redirectToShirtCheckout(userkey) {
    var shirtGender = $('.shirt-config-gender').val();
    var checkOutUrl = "shirt_checkout.html?ukey=" + userkey + "&shirt_size=" + shirtSize + "&shirt_color=" + shirtColor + "&shirt_gender=" + shirtGender;
    debuglog("call url in new window: " + checkOutUrl);
    window.open(checkOutUrl, "_blank");
}
