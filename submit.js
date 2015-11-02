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

function storeData() {
    console.log("storeData - send data..."); 
    var resulttype = $("#designType").val();
    var ukey = getParameterByName('ukey');
    
    $.post("./php/storeData.php", {
        ukey: ukey,
        designType: resulttype,
        gender: $("#gender").val(),
        age: $("#age").val(),
        professionalYears: $("#professionalYears").val(),
        educationLevel: $("#educationLevel").val(),
        educationBackground: $("#educationBackground").val(),
        role: $("#role").val(),
        programmingLanguage: $("#programmingLanguage").val(),
        methodology: $("#methodology").val(),
        companySize: $("#companySize").val(),
        industrySector: $("#industrySector").val(),
        latitude: "2", 
        longitude: "2", 
        simple1: localStorage["you.stmt_simple0"],
        simple2: localStorage["you.stmt_simple1"],
        simple3: localStorage["you.stmt_simple2"],
        simple4: localStorage["you.stmt_simple3"],
        simple5: localStorage["you.stmt_simple4"],
        simple6: localStorage["you.stmt_simple5"],
        powerful1: localStorage["you.stmt_powerful0"],
        powerful2: localStorage["you.stmt_powerful1"],
        powerful3: localStorage["you.stmt_powerful2"],
        powerful4: localStorage["you.stmt_powerful3"],
        powerful5: localStorage["you.stmt_powerful4"],
        powerful6: localStorage["you.stmt_powerful5"],
        abstract1: localStorage["you.stmt_abstract0"],
        abstract2: localStorage["you.stmt_abstract1"],
        abstract3: localStorage["you.stmt_abstract2"],
        abstract4: localStorage["you.stmt_abstract3"],
        abstract5: localStorage["you.stmt_abstract4"],
        abstract6: localStorage["you.stmt_abstract5"],
        concrete1: localStorage["you.stmt_concrete0"],
        concrete2: localStorage["you.stmt_concrete1"],
        concrete3: localStorage["you.stmt_concrete2"],
        concrete4: localStorage["you.stmt_concrete3"],
        concrete5: localStorage["you.stmt_concrete4"],
        concrete6: localStorage["you.stmt_concrete5"],
        pragmatic1: localStorage["you.stmt_pragmatic0"],
        pragmatic2: localStorage["you.stmt_pragmatic1"],
        pragmatic3: localStorage["you.stmt_pragmatic2"],
        pragmatic4: localStorage["you.stmt_pragmatic3"],
        pragmatic5: localStorage["you.stmt_pragmatic4"],
        pragmatic6: localStorage["you.stmt_pragmatic5"],
        idealistic1: localStorage["you.stmt_idealistic0"],
        idealistic2: localStorage["you.stmt_idealistic1"],
        idealistic3: localStorage["you.stmt_idealistic2"],
        idealistic4: localStorage["you.stmt_idealistic3"],
        idealistic5: localStorage["you.stmt_idealistic4"],
        idealistic6: localStorage["you.stmt_idealistic5"],
        technologic1: localStorage["you.stmt_technologic0"],
        technologic2: localStorage["you.stmt_technologic1"],
        technologic3: localStorage["you.stmt_technologic2"],
        technologic4: localStorage["you.stmt_technologic3"],
        technologic5: localStorage["you.stmt_technologic4"],
        technologic6: localStorage["you.stmt_technologic5"],
        robust1: localStorage["you.stmt_robust0"],
        robust2: localStorage["you.stmt_robust1"],
        robust3: localStorage["you.stmt_robust2"],
        robust4: localStorage["you.stmt_robust3"],
        robust5: localStorage["you.stmt_robust4"],
        robust6: localStorage["you.stmt_robust5"]
    }, function(data, status) {
        localStorage['you.ukey'] = userKey;
        continueToResultPage(ukey, resulttype);
    }).fail(function(err) {
        console.log(err.responseText);
        var problem = jQuery.parseJSON(err.responseText);
        if (problem.type == 'http://design-types.net/problems/ukey-already-exists') {
            console.log('ukey already exists; nothing is stored as the data is already in the db; continue with saved result');
            continueToResultPage(ukey, resulttype);
        } else {
            $('pre.error-details').text(err.responseText);
            $('.error-box').show();
        }
    });
}

function continueToResultPage(ukey, resulttype) {
    console.log("redirect to result page with user key: " + ukey);
    $(location).attr('href','result.html?type=' + resulttype + '&ukey=' + ukey);
}

$(document).ready(function() {
    $("#designType").attr('value', getDesignType());
    $("select").change(function() {
        if (everythingFilledOut())
            $("#result").attr("disabled", false);
        else
            $("#result").attr("disabled", true);
    });
    
    $("#result").click(function() {
        storeData();
    }); 
});

