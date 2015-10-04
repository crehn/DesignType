function showDimension(dimChar, dim1, dim2) {
    if (dimChar.toLowerCase() === dim1[0].toLowerCase()) {
        $("." + dim1).show();
        $("." + dim2).hide();
    } else {
        $("." + dim1).hide();
        $("." + dim2).show();
    }
}

$(document).ready(function(){
    type = getHttpParameter("type");
    
    $("#coat-of-arms").attr("src", "img/types/" + type.toUpperCase() + ".png");
    $("#type").text("Your Design Type: " + typesData[type.toLowerCase()].name + " (" + type + ")");
    showDimension(type[0], "simple", "powerful");
    showDimension(type[1], "abstract", "concrete");
    showDimension(type[2], "pragmatic", "idealistic");
    showDimension(type[3], "robust", "technologic");
});

