function getDimension() {
    return getParameterByName("dimension").substr(0, dimensions.length);
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
    $("#" + type.toLowerCase()).addClass("marked");
}

function dimensionToIndex(dimension) {
    var dimensions = ['simple', 'powerful', 'abstract', 'concrete', 'pragmatic', 'idealistic', 'technologic', 'robust'];
    return dimensions.indexOf(dimension);
}

$(document).ready(function() {
    $("#dimensions").accordion({ 
        collapsible: true,
        active: false ,
        heightStyle: "content"
    });
    
    showDimension(getDimension());
});

