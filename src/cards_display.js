
function fillPageWithContent(cardname) {
	
	var designCardObj = cardsData[cardname];
	debuglog("Found design card object with name: " + designCardObj.name);
	
	$('title').text(designCardObj.abbreviation);
	$('.c_cardname').text(designCardObj.name);
	$('#acronym').text(designCardObj.abbreviation);
	$('#cardname').text(designCardObj.name);
	$('#dimension').text(designCardObj.aspect);
	$('#level').text(designCardObj.set);
	$('#shortdesc').text(designCardObj.catchphrase);
	$('#longdesc').text(designCardObj.description);
	// set pics and links
	$('#cardpicture').attr("src", designCardObj.pathToPicture);
	$('#levelpicture').attr("src", designCardObj.setIcon);
	$('#dimensionpicture').attr("src", designCardObj.aspectIcon);
	$('#dimensionlink').attr("href", "./dimensions.html?dimension=" + designCardObj.aspect);
	// set commentid
	$('dt-comments').attr("pageid", designCardObj.commentId);
	
	loadContentFromPrinciplesWikiIntoPage(designCardObj.principlesWikiUrl);
	
	writeReferences(designCardObj.links);
}

function loadContentFromPrinciplesWikiIntoPage(principlesWikiUrl) {
    if (principlesWikiUrl != 'none') {
        var corsProblemSolverUrl = 'http://www.whateverorigin.org/get?url=';
        var correspondingWebsite = encodeURIComponent(principlesWikiUrl);
        $.getJSON(corsProblemSolverUrl + correspondingWebsite + '&callback=?', function(data){
            //debuglog("loaded: " + data.contents);
            var rationaleDiv = $($.parseHTML(data.contents)).find("h2:contains('Rationale')").next('.level2')
            //debuglog(rationaleDiv);
            $('.rationale').append('<h2>Rationale</h2>');
            $('.rationale').append(rationaleDiv);
            var strategiesDiv = $($.parseHTML(data.contents)).find("h2:contains('Strategies')").next('.level2')
            //debuglog(strategiesDiv);
            $('.strategies').append('<h2>Strategies</h2>');
            $('.strategies').append(strategiesDiv);
        });
    }
}

function writeReferences(refLinks) {
	if (typeof refLinks != "undefined") {
		//debuglog(refLinks[0]);
		var tableLinks = "<table class='table table-striped table-light'><thead class='header-table'><tr>";
		//tableLinks += "<td>Type</td><td>Abbreviation</td><td>Name</td><td>Set</td><td>Notes</td>";
		tableLinks += "<td>Type</td><td>Abbreviation</td><td>Name</td>";
		tableLinks += "</tr></thead>";
		tableLinks += "<tbody>";
		for (i = 0; i < refLinks.length; i++) {
			var link = refLinks[i];
			debuglog(link.type + "|" + link.abbreviation + "|" + link.name + "|" + link.set + "|" + link.notes);
			//tableLinks += "<tr><td>" + link.type + "</td>" + "<td><a href='./" + link.abbreviation + ".html'>" + link.abbreviation + "</td>" + "<td>" + link.name + "</a></td>" + "<td>" + link.set + "</td>" + "<td>" + link.notes + "</td></tr>";
			tableLinks += "<tr><td>" + link.type + "</td>" + "<td><a href='./" + link.abbreviation + ".html'>" + link.abbreviation + "</td>" + "<td>" + link.name + "</a></td></tr>";
		}
		tableLinks += "</tbody></table>";
		//$('.references').append('<h2>Related Arguments</h2>');
		$('.references').append(tableLinks);
	}
}


$(document).ready(function () {
	
	// just one condition: html file name MUST match string index of array that contains all design card arguments 
	var url = $(location).attr('href');
	var cardname = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));
	debuglog("from URL: " + cardname);
	
	fillPageWithContent(cardname);
	
});
