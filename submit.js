function getDesignType() {
    return getParameterByName("type").substr(0, 4);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function() {
    $("#designType option[value='" + getDesignType().toLowerCase() + "']").attr('selected',true);
});

