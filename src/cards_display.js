function fillPageWithContent(cardname) {
    var designCardObj = getCardObject(cardname);

    putImageSourcesIntoPage(designCardObj);

    putCardsContentIntoPage(designCardObj);

    if (isArgument(designCardObj.aspect)) {
        putReferencedArgumentsIntoPage(designCardObj.links);
        loadContentFromPrinciplesWikiIntoPage(designCardObj.principlesWikiUrl);
        putDimensionInfoIntoPage(designCardObj, true);
    } else {
        debuglog("hide card argument parts for non argument cards.");
        hideNonArgumentParts();
        putDimensionInfoIntoPage(designCardObj, false);
    }

    putCommentIdIntoPage(designCardObj);
}

function putDimensionInfoIntoPage(designCardObj, isArgumentCard) {
    if (isArgumentCard) {
        var dimensionLink = "/dimensions.html?dimension=" + designCardObj.aspect;
        $('#dimension').append("<a id=\"dimensionlink\" href=\"" + dimensionLink + "\">" + designCardObj.aspect + "</a>");
    } else {
        $('#dimension').text(designCardObj.aspect);
    }
}

function getCardObject(cardname) {
    var designCardObj = cardsData[cardname];
    if (typeof designCardObj != "undefined") {
        debuglog("Found design card object with name: " + designCardObj.name);
        return designCardObj;
    } else {
        debuglog("Unknown card object with cardname: " + cardname + " - route to cards overview");
        $(location).attr('href', "./cards.html");
    }
}

function putCommentIdIntoPage(designCardObj) {
    debuglog("dynamically change comment pageid to: " + designCardObj.commentId);
    $('dt-comments').attr("pageid", designCardObj.commentId);
}

function hideNonArgumentParts() {
    $('#referencedargs').hide();
    $('.wikicontent').hide();
}

function isArgument(cardAspect) {
    const argumentAspects = ['simple', 'powerful', 'abstract', 'concrete', 'pragmatic', 'idealistic', 'robust', 'technologic'];
    return argumentAspects.includes(cardAspect);
}

function loadContentFromPrinciplesWikiIntoPage(principlesWikiUrl) {
    if (principlesWikiUrl != 'none') {
        var corsProblemSolverUrl = 'http://www.whateverorigin.org/get?url=';
        var correspondingWebsite = encodeURIComponent(principlesWikiUrl);
        $.getJSON(corsProblemSolverUrl + correspondingWebsite + '&callback=?', function (data) {
            //debuglog("loaded: " + data.contents);
            var rationaleDiv = $($.parseHTML(data.contents)).find("h2:contains('Rationale')").next('.level2');
            //debuglog(rationaleDiv);
            $('.rationale').append('<h2>Rationale</h2>');
            $('.rationale').append(rationaleDiv);
            var strategiesDiv = $($.parseHTML(data.contents)).find("h2:contains('Strategies')").next('.level2');
            //debuglog(strategiesDiv);
            $('.strategies').append('<h2>Strategies</h2>');
            $('.strategies').append(strategiesDiv);
            // set direct links
            $('.wikilink').attr("href", principlesWikiUrl);
        });
    } else {
        $('.wikicontent').hide();
    }
}

function putReferencedArgumentsIntoPage(refLinks) {
    if (typeof refLinks != "undefined") {
        var tableLinks = "<table class='table table-striped table-light'><thead class='header-table-cardrefs'><tr>";
        //tableLinks += "<td>Type</td><td>Abbreviation</td><td>Name</td><td>Set</td><td>Notes</td>";
        tableLinks += "<td>Type</td><td>Abbreviation</td><td>Name</td>";
        tableLinks += "</tr></thead>";
        tableLinks += "<tbody>";
        for (i = 0; i < refLinks.length; i++) {
            var link = refLinks[i];
            //debuglog(link.type + "|" + link.abbreviation + "|" + link.name + "|" + link.set + "|" + link.notes);
            //tableLinks += "<tr><td>" + link.type + "</td>" + "<td><a href='./" + link.abbreviation + ".html'>" + link.abbreviation + "</td>" + "<td>" + link.name + "</a></td>" + "<td>" + link.set + "</td>" + "<td>" + link.notes + "</td></tr>";
            tableLinks += "<tr><td>" + link.type + "</td>" + "<td><a href='./" + link.abbreviation + ".html'>" + link.abbreviation + "</td>" + "<td>" + link.name + "</a></td></tr>";
        }
        tableLinks += "</tbody></table>";
        $('.references').append(tableLinks);
    } else {
        $('#referencedargs').hide();
    }
}

function putCardsContentIntoPage(designCardObj) {
    $('title').text(designCardObj.abbreviation);
    $('.c_cardname').text(designCardObj.name);
    $('#acronym').text(designCardObj.abbreviation);
    $('#cardname').text(designCardObj.name);
    $('#level').text(designCardObj.set);
    $('#shortdesc').text(designCardObj.catchphrase);
    $('#longdesc').text(designCardObj.description);
}

function putImageSourcesIntoPage(designCardObj) {
    $('#cardpicture').attr("src", designCardObj.pathToPicture);
    $('#levelpicture').attr("src", designCardObj.setIcon);
    $('#dimensionpicture').attr("src", designCardObj.aspectIcon);
}

function investigateCardnameFromUrl() {
    var url = $(location).attr('href');
    var cardname;
    // just one condition: html file/URL ending name MUST match string index of array that contains all design card arguments
    if (url.lastIndexOf('?cardid=') != -1) {
        cardname = url.substring(url.lastIndexOf('=') + 1, url.length);
    } else if (url.lastIndexOf('.html') != -1) {
        cardname = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    } else {
        cardname = url.substring(url.lastIndexOf('/') + 1, url.length);
    }
    debuglog("found cardname: " + cardname + " using url: " + url);
    return cardname;
}

$(document).ready(function () {
    var cardname = investigateCardnameFromUrl();

    fillPageWithContent(cardname);
});
