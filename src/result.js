function drawOverlapCharts(ukey, designType) {
    debuglog("loadQuestionnaireDetails - ukey: " + ukey);
    $.get("php/loadQuestionnaireDetails.php?ukey=" + ukey, function(details, status) {
        debuglog("loadQuestionnaireDetails - status: " + status + ", data: " + details);
        var dimensionChart = new DimensionOverlapChart(details, 1);
        dimensionChart.draw();
        var typeChart = new TypeOverlapChart(designType, details, ukey, 1);
        typeChart.draw(); 
    });
} 

function drawTypesBarChart(resultType) {
    $.get("php/loadCountPerResultType.php", function(dataForBars, status) {
        debuglog("loadCountPerResultType - status: " + status + ", data: " + dataForBars);
        var barChart = new TypesBarChart(dataForBars, resultType);
        barChart.draw();
     });
} 

$(document).ready(function(){
    var resultType = getHttpParameter("type");
    var userkey = getHttpParameter("ukey");
    
    if (userkey != null && userkey !== undefined) {
    	drawOverlapCharts(userkey, resultType); 
    	$(".certificate-link").attr("href", "certificate.html?type=" + resultType + "&ukey=" + userkey);
    } else {
    	$('.typediagnostic').hide();
    }
    
    drawTypesBarChart(resultType);
    
    initSpreadshirtFunctions(resultType, userkey);
});

