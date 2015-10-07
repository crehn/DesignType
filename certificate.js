function showDimension(dimChar, dim1, dim2) {
    if (dimChar.toLowerCase() === dim1[0].toLowerCase()) {
        $("." + dim1).show();
        $("." + dim2).hide();
    } else {
        $("." + dim1).hide();
        $("." + dim2).show();
    }
}

function createCertificatePanel(typeabbreviation) {
    var result = $("#templateType").clone();
    result.attr("id", typeabbreviation + "_info");
    result.find(".typeicon").append("<img src='./img/types/" + typeabbreviation.toUpperCase() + ".png' width='300' />");
    result.find(".designs").html(typesData[typeabbreviation].designs);
    result.find(".programming").html(typesData[typeabbreviation].programming);
    result.find(".principles-liked").html(arrayToCommaList(typesData[typeabbreviation].principlesLiked));
    result.find(".principles-disregarded").html(arrayToCommaList(typesData[typeabbreviation].principlesDisregarded));
    $("#types").append(result);
    
    createLegend(result, typeabbreviation);
    
    result.show();
    
    $("#templateType").remove();
    
    return result;
}

//FIXME: this is copy + paste from types.js
function arrayToCommaList(array) {
    return array.join(", ");
}

//FIXME: this is copy + paste from types.js
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//FIXME: this is copy + paste from types.js
function attribute(value) {
    return '<a class="dont-print-url" href="dimensions.html?dimension=' + value + '">' + value.capitalize() + '</a> ';
}

// FIXME: this is copy + paste from types.js - refactor (there is too much dependency between jquery doc.ready and functions)
function createLegend(topelement, typeabbreviation) {
	topelement.find(".simple").append("<td><img src='img/dimensions/simple.png' height='50' alt='simple' title='" 
			+ dimensionsData["simple"].icondescription + "' /></td><td><b>" + attribute("simple") 
			+ ": </b> " + dimensionsData["simple"].shortdescription + "</td>");
	topelement.find(".powerful").append("<td><img src='img/dimensions/powerful.png' height='50' alt='powerful' title='" 
			+ dimensionsData["powerful"].icondescription + "' /></td><td><b>" + attribute("powerful") 
			+ ": </b>" + dimensionsData["powerful"].shortdescription + "</td>");
	topelement.find(".abstract").append("<td><img src='img/dimensions/abstract.png' height='50' alt='abstract' title='" 
			+ dimensionsData["abstract"].icondescription + "' /></td><td><b>" + attribute("abstract") 
			+ ": </b> " + dimensionsData["abstract"].shortdescription + "</td>");
	topelement.find(".concrete").append("<td><img src='img/dimensions/concrete.png' height='50' alt='concrete' title='" 
			+ dimensionsData["concrete"].icondescription + "' /></td><td><b>" + attribute("concrete") 
			+ ": </b> " + dimensionsData["concrete"].shortdescription + "</td>");
	topelement.find(".pragmatic").append("<td><img src='img/dimensions/pragmatic.png' height='50' alt='pragmatic' title='" 
			+ dimensionsData["pragmatic"].icondescription + "' /></td><td><b>" + attribute("pragmatic") 
			+ ": </b> " + dimensionsData["pragmatic"].shortdescription + "</td>");
	topelement.find(".idealistic").append("<td><img src='img/dimensions/idealistic.png' height='50' alt='idealistic' title='" 
			+ dimensionsData["idealistic"].icondescription + "' /></td><td><b>" + attribute("idealistic") 
			+ ": </b> " + dimensionsData["idealistic"].shortdescription + "</td>");
	topelement.find(".robust").append("<td><img src='img/dimensions/robust.png' height='50' alt='robust' title='" 
			+ dimensionsData["robust"].icondescription + "' /></td><td><b>" + attribute("robust") 
			+ ": </b> " + dimensionsData["robust"].shortdescription + "</td>");
	topelement.find(".technologic").append("<td><img src='img/dimensions/technologic.png' height='50' alt='technologic' title='" 
			+ dimensionsData["technologic"].icondescription + "' /></td><td><b>" + attribute("technologic") 
			+ ": </b> " + dimensionsData["technologic"].shortdescription + "</td>");
	
	if (typeabbreviation.charAt(0) == 's') {
		topelement.find(".powerful").hide();
	} else {
		topelement.find(".simple").hide();
	}
	if (typeabbreviation.charAt(1) == 'a') {
		topelement.find(".concrete").hide();
	} else {
		topelement.find(".abstract").hide();
	}
	if (typeabbreviation.charAt(2) == 'p') {
		topelement.find(".idealistic").hide();
	} else {
		topelement.find(".pragmatic").hide();
	}
	if (typeabbreviation.charAt(3) == 'r') {
		topelement.find(".technologic").hide();
	} else {
		topelement.find(".robust").hide();
	}
}

$(document).ready(function(){
    type = getHttpParameter("type");
    
    createCertificatePanel(type.toLowerCase());
});

