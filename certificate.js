function loadDimensionDescriptions() {
    var dimensions = ['simple', 'powerful', 'abstract', 'concrete', 'pragmatic', 'idealistic', 'robust', 'technologic'];
    for (var dim in dimensions) {
        $("#dimension-description dd." + dimensions[dim]).html(dimensionsData[dimensions[dim]].description);
        $("#dimension-description dt." + dimensions[dim] + ' img').attr('title', dimensionsData[dimensions[dim]].icondescription);
    }
}

function showDesignType(type) {
    $("#coat-of-arms img").attr("src", "img/types/" + type.toUpperCase() + ".png");
    $("#type").text("Your Design Type: " + typesData[type.toLowerCase()].name + " (" + type + ")");
    showDimension(type[0], "simple", "powerful");
    showDimension(type[1], "abstract", "concrete");
    showDimension(type[2], "pragmatic", "idealistic");
    showDimension(type[3], "robust", "technologic");
    $(".your-designs-are").html(typesData[type.toLowerCase()].designs);
    $(".programming-is").html(typesData[type.toLowerCase()].programming);
}

function showDimension(dimChar, dim1, dim2) {
    if (dimChar.toLowerCase() === dim1[0].toLowerCase()) {
        $("." + dim1).show();
        $("." + dim2).hide();
    } else {
        $("." + dim1).hide();
        $("." + dim2).show();
    }
}

function drawOverlapCharts(ukey, designType) {
    debuglog("loadQuestionaireDetails - ukey: " + ukey);
    $.get("php/loadQuestionaireDetails.php?ukey=" + ukey, function(details, status) {
        debuglog("loadQuestionaireDetails - status: " + status + ", data: " + details);
        var dimensionChart = new DimensionOverlapChart(details, 0.7);
        dimensionChart.draw();
        var typeChart = new TypeOverlapChart(designType, details, ukey, 0.7);
        typeChart.draw(); 
    });
} 

$(document).ready(function(){
    loadDimensionDescriptions();
    
    var resultType = getHttpParameter("type");
    var userkey = getHttpParameter("ukey");
    
    showDesignType(resultType);
	drawOverlapCharts(userkey, resultType); 
	$(".certificate-link").attr("href", "certificate.html?type=" + resultType + "&ukey=" + userkey);
});

