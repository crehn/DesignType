function getDimension() {
    return getParameterByName("dimension");
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function showDimension(dimension) {
    $("#dimensions").accordion("option", "active", dimensionToIndex(dimension));
    $("#dimension h2").removeClass("marked");
}

function dimensionToIndex(dimension) {
    if (dimension == "")
        return 0;

    var dimensions = ['simple', 'powerful', 'abstract', 'concrete', 'pragmatic', 'idealistic', 'technologic', 'robust'];
    return Math.floor(dimensions.indexOf(dimension) / 2);
}

$(document).ready(function() {
    $("#dimensions").accordion({ 
        collapsible: true,
        active: false ,
        heightStyle: "content"
    });
    
    showDimension(getDimension());
});

