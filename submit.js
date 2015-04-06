function getDesignType() {
    return getParameterByName("type").substr(0, 4);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function everythingFilledOut() {
    var result = true;
    var allSelects = $("select");
    for (select in allSelects) {
        if (allSelects[select].value == "")
            result = false;
    }
    return result;
}

$(document).ready(function() {
    $("#designType").attr('value', getDesignType());
    $("select").change(function() {
        if (everythingFilledOut())
            $("#submit").attr("disabled", false);
        else
            $("#submit").attr("disabled", true);
    });
});

