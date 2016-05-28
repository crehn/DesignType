// 1=white, 2=black, 5=red, 4=navy, 17=royalblue, 231=heather grey, 120=brown, 88=grass green, 85=aqua, 
// 129=asphalt 464=forest green, 146=light blue, 99=pink, 130=army, 114=lemon, 135=gold, 143=raspberry, 
// 121=grey, 277=purple, 15=lime, 219, deep mint
var shirtColor = 4;
// 2=S, 3=M, 4=L, 5=XL, 6=XXL, 38=3XL
var shirtSize = 4;
var country = 1;

function changeShirtSize(newSize) {
	shirtSize = newSize;
	console.log("new shirt size: " + shirtSize);
}

function changeShirtColor(newColor) {
	shirtColor = newColor;
	console.log("new shirt color: " + newColor);
	// change bg color of shirt
	var newClazz = "shirt_bg shirt_bg_" + newColor;
	$("#shirt_display").attr('class', newClazz);
}

function changeHomeCountry(newCountry) {
	country = newCountry;
	console.log("new country: " + newCountry);
}

function createShirtImage(resultType, userkey) {
	console.log("createShirtImage for: " + userkey);
	$.post("./php/buildResultImageForShirt.php", { ukey: userkey, restype: resultType })
	  .done(function(data, status) {
		  console.log("createShirtImage - status: " + status + "; with result path to image: " + data);
		  // change the overlay image by current created one
	      var newImgSrc = "./php/shirtorders/" + userkey + ".png";
	      $(".overlay-img").attr('src', newImgSrc);
	      console.log("set new img src: " + newImgSrc);
	  })
	  .fail(function(err) {
	      console.log("error creating spreadshirt image: " + err.responseText);
	  });
} 

function checkoutShirt(userkey) {
	console.log("checkoutShirt for: " + userkey);
	$('#wholebody').css('cursor', 'wait');
	$('#checkout').css('cursor', 'wait');
	var shipCountry = $('#shipping_country').val();
	console.log("ship country: " + shipCountry);
	$.post("./php/buildShirtBasketItemInShop.php", { ukey: userkey, shirt_size: shirtSize, shirt_color: shirtColor, ship_country: shipCountry })
	  .done(function(data, status) {
		  console.log("checkoutShirt - status: " + status + "; with url to checkout: " + data['0']);
		  // relocate to checkout page
		  $(location).attr('href', data['0']);
	  })
	  .fail(function(err) {
	      console.log("error creating spreadshirt basket item: " + err.responseText);
	      $('#wholebody').css('cursor', 'auto');
	      $('#checkout').css('cursor', 'auto');
	  });
} 

function initSpreadshirtFunctions(resultType, userkey) {
	// build result image for spread shirt
	createShirtImage(resultType, userkey);
	
	// size buttons
	// 2=S, 3=M, 4=L, 5=XL, 6=XXL, 38=3XL
	$("#size_s").click(function() {
    	changeShirtSize(2);
     });
    $("#size_m").click(function() {
    	changeShirtSize(3);
     });
    $("#size_l").click(function() {
    	changeShirtSize(4);
     });
    $("#size_xl").click(function() {
    	changeShirtSize(5);
     });
    $("#size_xxl").click(function() {
    	changeShirtSize(6);
     });
    $("#size_3xl").click(function() {
    	changeShirtSize(38);
     });
    
    // shirt color buttons
 // 1=white, 2=black, 5=red, 4=navy, 17=royalblue, 231=heather grey, 120=brown, 88=grass green, 85=aqua, 
 // 129=asphalt 464=forest green, 146=light blue, 99=pink, 130=army, 114=lemon, 135=gold, 143=raspberry, 
 // 121=grey, 277=purple, 15=lime, 219, deep mint
    $("#color_white").click(function() {
    	changeShirtColor(1);
     });
    $("#color_black").click(function() {
    	changeShirtColor(2);
     });
    $("#color_royalblue").click(function() {
    	changeShirtColor(17);
     });
    $("#color_navy").click(function() {
    	changeShirtColor(4);
     });
    $("#color_divablue").click(function() {
    	changeShirtColor(388);
     });
    $("#color_deepmint").click(function() {
    	changeShirtColor(594);
     });
    $("#color_kellygreen").click(function() {
    	changeShirtColor(92);
     });
    $("#color_red").click(function() {
    	changeShirtColor(5);
     });
    
    // checkout button
    $("#checkout").click(function() {
    	checkoutShirt(userkey);
    });
    
    /*
    $(".btn-size-select").click(function() {
    	$(this).toggleClass('btn-size-active');
    });
    */
}