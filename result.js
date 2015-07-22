var debug = true;
var resultType;

function GraphSettings(border, space, boxWidth, boxHeight, txtSpacer, yMarginBarTotal) {
   this.border = border;
   this.space = space;
   this.boxWidth = boxWidth;
   this.boxHeight = boxHeight;
   this.boxWidthHalf = boxWidth / 2;
   this.boxHeightHalf = boxHeight / 2;
   this.txtSpacer = txtSpacer;
   this.width = border + (2 * space) + (2 * boxWidth) + border;
   this.height = border + (3 * space) + (4 * boxHeight) + border;
   this.xBarIncr = (boxWidth + 2*space + boxWidth) / 10;
   this.yMarginBarTotal = 10;
   this.barLength = 5 * this.xBarIncr;
   this.barHeight = boxHeight - yMarginBarTotal;
}

function DesignTypeBox(x, y, xTxt, yTxt, content) {
  this.x = x;
  this.y = y;
  this.xTxt = xTxt;
  this.yTxt = yTxt;
  this.content = content;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}


//################### Dimension Overlap chart

function DimensionOverlapChart(details) {
    var gs = new GraphSettings(5, 5, 150, 50, 5, 10);
    var contentBoxes = new Array("Simple", "Powerful", "Abstract", "Concrete", "Pragmatic", "Idealistic", "Robust", "Technologic");
    // the dimension boxes as background
    var designTypeBoxes;
    // dynamically calculated overlay boxes
    var rectPoints;
    // all possible coordinates of overlay boxes
    var xPoints;
    var yPoints;

    this.draw = function() {
        calculatePositionsOfBoxesAndText();
        draw();
    }

    function calculatePositionsOfBoxesAndText() {
        var xPosBoxesA = gs.border;
        var xPosBoxesB = (gs.border + gs.boxWidth + 2 * gs.space);
        var yFirstBoxPos = gs.border;
        var ySpacerBox =  gs.boxHeight + gs.space;
        var yBoxes = new Array( yFirstBoxPos, yFirstBoxPos, yFirstBoxPos + 1*ySpacerBox, yFirstBoxPos + 1*ySpacerBox, yFirstBoxPos + 2*ySpacerBox, yFirstBoxPos + 2*ySpacerBox, yFirstBoxPos + 3*ySpacerBox, yFirstBoxPos + 3*ySpacerBox );
        var xTxt = new Array( gs.border + gs.txtSpacer, gs.border + 2 * gs.boxWidth + 2 *gs.space - gs.border );
        var yFirstTextPos = gs.border + gs.boxHeightHalf;
        var ySpacerTxt = gs.boxHeight + gs.space; 
        var yTxt = new Array( yFirstTextPos, yFirstTextPos, yFirstTextPos + 1*ySpacerTxt, yFirstTextPos + 1*ySpacerTxt, yFirstTextPos + 2*ySpacerTxt, yFirstTextPos + 2*ySpacerTxt, yFirstTextPos + 3*ySpacerTxt, yFirstTextPos + 3*ySpacerTxt );

        designTypeBoxes = new Array( 
            new DesignTypeBox(xPosBoxesA, yBoxes[0], xTxt[0], yTxt[0], contentBoxes[0]), 
            new DesignTypeBox(xPosBoxesB, yBoxes[1], xTxt[1], yTxt[1], contentBoxes[1]), 
            new DesignTypeBox(xPosBoxesA, yBoxes[2], xTxt[0], yTxt[2], contentBoxes[2]), 
            new DesignTypeBox(xPosBoxesB, yBoxes[3], xTxt[1], yTxt[3], contentBoxes[3]), 
            new DesignTypeBox(xPosBoxesA, yBoxes[4], xTxt[0], yTxt[4], contentBoxes[4]), 
            new DesignTypeBox(xPosBoxesB, yBoxes[5], xTxt[1], yTxt[5], contentBoxes[5]), 
            new DesignTypeBox(xPosBoxesA, yBoxes[6], xTxt[0], yTxt[6], contentBoxes[6]), 
            new DesignTypeBox(xPosBoxesB, yBoxes[7], xTxt[1], yTxt[7], contentBoxes[7]) );

        // content bars
        xPoints = new Array(
            gs.border, 
            gs.border + 1*gs.xBarIncr, 
            gs.border + 2*gs.xBarIncr, 
            gs.border + 3*gs.xBarIncr, 
            gs.border + 4*gs.xBarIncr, 
            gs.border + 5*gs.xBarIncr); // rect start points x axis (5,36,67,98,129,160)
        var yOffsetBar = gs.barHeight / 2; 
        yPoints = new Array(
            yTxt[0] - yOffsetBar, 
            yTxt[2] - yOffsetBar, 
            yTxt[4] - yOffsetBar, 
            yTxt[6] - yOffsetBar); // take text position of each line(index + 2) and subtract offset for bar
            
        var posMidPnt = 5; // 5 is middle index of eleven points (10 areas) in an array
        rectPoints = new Array(
            new Point(xPoints[(posMidPnt - details[0])], yPoints[0]), 
            new Point(xPoints[(posMidPnt - details[2])], yPoints[1]), 
            new Point(xPoints[(posMidPnt - details[4])], yPoints[2]), 
            new Point(xPoints[(posMidPnt - details[6])], yPoints[3]) );
    }

    function draw() {
      var svg = d3.select("#box1").append("svg")
                    .attr("width", gs.width)
                    .attr("height", gs.height);

        drawBoxes(svg);
        drawTexts(svg);
        drawBars(svg);
    }
    
    function drawBoxes(svg) {
        svg.selectAll(".box")
            .data(designTypeBoxes).enter()
                .append("rect")
                .attr("x", function(d) { return d.x } )
                .attr("width", gs.boxWidth)
                .attr("y", function(d) { return d.y } )
                .attr("height", gs.boxHeight)
                .attr("style", "fill: steelblue; stroke: black; stroke-width: 3; cursor: pointer;")
                .attr("onclick", getDimensionRedirect);
    }
    
    function drawTexts(svg) {
        svg.selectAll(".txt")
            .data(designTypeBoxes).enter()
                .append("text")
                .attr("x", function(d) { return d.xTxt } )
                .attr("y", function(d) { return d.yTxt } )
                .attr("dy", ".35em")
                .attr("style", getTextStyle)
                .text( function(d, i) { return d.content } )
                .attr("onclick", getDimensionRedirect);
    }
    
    function drawBars(svg) {
        svg.selectAll(".bars")
            .data(rectPoints).enter()
                .append("rect")
                .attr("x", function(d) { return d.x } )
                .attr("width", gs.barLength)
                .attr("y", function(d) { return d.y } )
                .attr("height", gs.barHeight)
                .attr("style", "stroke:#660000; fill:#cc3333; stroke-width: 2; fill-opacity: .5;");
    }

    function getTextStyle(d) {
      var txtAnchor = d.xTxt > 100 ? "end" : "start"; // dirty - should be mod 2 by elements 
      return "fill: white; stroke: white; text-anchor: "+txtAnchor+"; font-size: 1.4em; font-family: Arial; cursor: pointer;";
    }

    function getDimensionRedirect(d) {
      return "window.location.href='dimensions.html?dimension=" + d.content.toLowerCase() +"';";
    }
}

//################### Result Type Overlap chart

function TypeOverlapChart(designType, details, ukey) {
    var is = new ImageSettings(3, 10, 67, 67, 5);
    // overlaps to other design types (for 5 answers -> 2 is max overlap)
    var matchesDimTop;
    var matchesDimLeft;
    var matchesDimRight;
    var matchesDimBottom;
    // all boxes, the current one and all close to it
    var resultTypeBoxes;
    // the points of the overlay polygon
    var polygonPoints;
    
    function DesignDimension (dim1, dim2) {
        this.dim1 = dim1;
        this.dim2 = dim2;
        
        this.getAlternativeDimension = function(currentDimensionValue) {
            return getAlternativeDimension(currentDimensionValue);
        }
        
        function getAlternativeDimension(curDim) {
            if (curDim == dim1) {
                return dim2;
            } else if (curDim == dim2) {
                return dim1;
            } else {
                console.log("passed dimension["+curDim+"] not available in this object!");
            }
        }
    }

    function ImageSettings(border, space, boxWidth, boxHeight, txtSpacer) {
       this.border = border;
       this.space = space;
       this.boxWidth = boxWidth;
       this.boxHeight = boxHeight;
       this.boxWidthHalf = boxWidth / 2;
       this.boxHeightHalf = boxHeight / 2;
       this.boxWidthQuarter = boxWidth / 4;
       this.boxHeightQuarter = boxHeight / 4;
       this.txtSpacer = txtSpacer;
       this.width = (3 * boxWidth) + (2 * space) + (2 * border);
       this.height = (3 * boxHeight) + (2 * space) + (2 * border);
    }
    
    this.draw = function() {
        preparePolygonImage();
        var svg = d3.select("#box2").append("svg")
            .attr("width", is.width)
            .attr("height", is.height);
      
        drawBoxes(svg);
        drawText(svg);
        if (shouldDrawPolygon())
            drawPolygon(svg);
    }

    function preparePolygonImage() {
        var simplePowerful = new DesignDimension("S", "P");
        var abstractConcrete = new DesignDimension("A", "C");
        var pragmaticIdealistic = new DesignDimension("P", "I");
        var technologicRobust = new DesignDimension("R", "T");

        var type1 = simplePowerful.getAlternativeDimension(designType.substr(0, 1)) + designType.substr(1, 3);
        var type2 = designType.substr(0, 1) + abstractConcrete.getAlternativeDimension(designType.substr(1, 1)) + designType.substr(2, 2);
        var type4 = designType.substr(0, 2) + pragmaticIdealistic.getAlternativeDimension(designType.substr(2, 1)) + designType.substr(3, 1);
        var type5 = designType.substr(0, 3) + technologicRobust.getAlternativeDimension(designType.substr(3, 1));
        var contentBoxes = new Array(type1, type2, designType, type4, type5);

        // top, left, center, right, bottom 
        var boxOffsetLeft = is.border + is.boxWidth + is.space;
        var xBoxes = new Array( boxOffsetLeft, is.border, boxOffsetLeft, (boxOffsetLeft + is.boxWidth + is.space), boxOffsetLeft );
        var boxOffsetTop = is.border + is.boxHeight + is.space;
        var yBoxes = new Array( is.border, boxOffsetTop, boxOffsetTop, boxOffsetTop, (boxOffsetTop + is.boxHeight + is.space) );
        var txtOffsetLeft = is.border + is.boxWidth + is.space + is.boxWidthHalf;
        var xTxt = new Array( txtOffsetLeft, (is.border + is.boxWidthHalf), txtOffsetLeft, (txtOffsetLeft + is.boxWidth + is.space), txtOffsetLeft );
        var txtOffsetTop = is.border + is.boxHeight + is.space + is.boxHeightHalf;
        var yTxt = new Array( (is.border + is.boxHeightHalf), txtOffsetTop, txtOffsetTop, txtOffsetTop, (txtOffsetTop + is.boxHeight + is.space) );

        resultTypeBoxes = new Array( 
            new DesignTypeBox(xBoxes[0], yBoxes[0], xTxt[0], yTxt[0], contentBoxes[0]), 
            new DesignTypeBox(xBoxes[1], yBoxes[1], xTxt[1], yTxt[1], contentBoxes[1]), 
            new DesignTypeBox(xBoxes[2], yBoxes[2], xTxt[2], yTxt[2], contentBoxes[2]), 
            new DesignTypeBox(xBoxes[3], yBoxes[3], xTxt[3], yTxt[3], contentBoxes[3]), 
            new DesignTypeBox(xBoxes[4], yBoxes[4], xTxt[4], yTxt[4], contentBoxes[4]) );

        matchesDimTop = (details[0] > details[1]) ? details[1] : details[0];
        matchesDimLeft = (details[2] > details[3]) ? details[3] : details[2];
        matchesDimRight = (details[4] > details[5]) ? details[5] : details[4];
        matchesDimBottom = (details[6] > details[7]) ? details[7] : details[6];
        debuglog("preparePolygonImage - top: " + matchesDimTop + "; left: " + matchesDimLeft + "; right: " + matchesDimRight + "; bottom: " + matchesDimBottom);

        var midImageX = boxOffsetLeft + is.boxWidthHalf;
        var midImageY = boxOffsetTop + is.boxHeightHalf;
        var polygonPntDimTop = new Point( txtOffsetLeft, midImageY - is.boxHeightHalf - is.space - (is.boxHeightQuarter * matchesDimTop) );
        var polygonPntDimLeft = new Point( midImageX - is.boxWidthHalf - is.space - (is.boxWidthQuarter * matchesDimLeft), txtOffsetTop );
        var polygonPntDimRight = new Point( midImageX + is.boxWidthHalf + is.space + (is.boxWidthQuarter * matchesDimRight), txtOffsetTop );
        var polygonPntDimBottom = new Point( txtOffsetLeft, midImageY + is.boxHeightHalf + is.space + (is.boxHeightQuarter * matchesDimBottom) );

        polygonPoints = new Array(polygonPntDimTop, polygonPntDimLeft, polygonPntDimRight, polygonPntDimBottom);
    }

    function drawBoxes(svg) {
        svg.selectAll(".box")
            .data(resultTypeBoxes).enter()
                .append("rect")
                .attr("x", function(d) { return d.x } )
                .attr("width", is.boxWidth)
                .attr("y", function(d) { return d.y } )
                .attr("height", is.boxHeight)
                .attr("style", "fill: steelblue; stroke: black; stroke-width: 3; cursor: pointer;")
                .attr("onclick", getResultTypeRedirect);
    }
    
    function drawText(svg) {
        svg.selectAll(".txt")
            .data(resultTypeBoxes).enter()
                .append("text")
                .attr("x", function(d) { return d.xTxt } )
                .attr("y", function(d) { return d.yTxt + is.txtSpacer } )
                .attr("style", "fill: white; stroke: white; text-anchor: middle; font-size: 1.5em; font-family: Arial; cursor: pointer;")
                .text( function(d, i) { return d.content } )
                .attr("onclick", getResultTypeRedirect);
    }
    
    function shouldDrawPolygon() {
        return true;
    }
    
    function drawPolygon(svg) {
        svg.append("polygon")
        .attr("points", 
            (polygonPoints[0].x + 15) + "," + polygonPoints[0].y + " " 
             + (polygonPoints[0].x -15) + "," + polygonPoints[0].y + " " 
             + polygonPoints[1].x + "," + (polygonPoints[1].y -15) + " " 
             + polygonPoints[1].x + "," + (polygonPoints[1].y +15) + " " 
             + (polygonPoints[3].x -15) + "," + polygonPoints[3].y + " " 
             + (polygonPoints[3].x +15) + "," + polygonPoints[3].y + " " 
             + polygonPoints[2].x + "," + (polygonPoints[2].y +15) + " " 
             + polygonPoints[2].x + "," + (polygonPoints[2].y -15)
             )
        .attr("style", "stroke:#660000; fill:#cc3333; stroke-width: 2; fill-opacity: .5;" );
    }

    function getResultTypeRedirect(d) {
        //TODO: use ukey as soon as shouldDrawPolygon() is implemented
        //return "window.location.href='result.html?type=" + d.content +"&ukey=" + ukey + "';";
        return "window.location.href='result.html?type=" + d.content + "';";
    }
}


//################### Statistics chart

function BarChart(dataForBars) {
    var width = 800;
    var height = 250;
    var margin = {top: 20, right: 20, bottom: 30, left: 40};

    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangeRoundBands([0, innerWidth], .2);
    var y = d3.scale.linear().range([innerHeight, 0]);

    this.draw = function () {
        draw();
    }
    
    function draw() {
        svg = d3.select("#statsbox").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        drawXAxis(svg);
        drawYAxis(svg);
        drawBars(svg);
        drawPercentValues(svg);
    }
    
    function drawXAxis(svg) {
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        x.domain(dataForBars.map(function(d) { return d.type; }));
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);
    }
    
    function drawYAxis(svg) {
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");
        y.domain([0, d3.max(dataForBars, function(d) { return d.amount; })]);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
    }
    
    function drawBars(svg) {
        var bar = svg.selectAll(".bar")
            .data(dataForBars)
            .enter().append("rect")
                .attr("class", function(d) { return d.type === resultType ? "baractive" : "bar" })
                .attr("x", function(d) { return x(d.type); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.amount); })
                .attr("height", function(d) { return innerHeight - y(d.amount); });
    }
    
    function drawPercentValues(svg) {
        var txt = svg.selectAll(".txtstat")
            .data(dataForBars)
            .enter().append("text")
                .attr("x", function(d) { return x(d.type) + (x.rangeBand() / 2); })
                .attr("y", function(d) { return y(d.amount) - (margin.top / 2); })
                .attr("dy", ".15em")
                .text(percentValueAsText)
                .style("text-anchor", "middle")
                .style("font-size", ".8em");
    }

    function percentValueAsText(d) {
	    var percent = d.amount * 100;
	    if (percent < 1) {
	        return "< 1 %";
	    } else {
	        return Math.round(percent) + " %";
	    }
    }

}

//################### Utils

function getHttpParameter(key) {
    var callUrl = window.location.search.substring(1);
    var urlVars = callUrl.split('&');
    for (var i = 0; i < urlVars.length; i++) {
       var nameValue = urlVars[i].split('=');
       if (nameValue[0] == key) {
          return nameValue[1];
       }
    }
 }
 
function debuglog(msg) {
    if (debug) { 
        console.log(msg); 
    }
}

//###################

function loadQuestionaireDetails(userKey, designType) {
   var details;
   debuglog("loadQuestionaireDetails - userKey: " + userKey);
   $.when( 
        $.get("http://cors.io/?u=http://design-types.net/test/" + "./php/loadQuestionaireDetails.php?userkey=" + userKey, function(data, status) {
            debuglog("loadQuestionaireDetails - status: " + status + ", data: " + data);
            details = jQuery.parseJSON(data);
        })
   ).then( function () {
        var dimensionChart = new DimensionOverlapChart(details);
        dimensionChart.draw();
        var typeChart = new TypeOverlapChart(designType, details, userKey);
        typeChart.draw(); 
    });
} 

function loadCountPerResultType() {
    var dataForBars;
    $.when( 
        $.get("http://cors.io/?u=http://design-types.net/test/" + "./php/loadCountPerResultType.php", function(data, status) {
            debuglog("loadCountPerResultType - status: " + status + ", data: " + data);
            dataForBars = jQuery.parseJSON(data);
         })
   ).then( function () {
        var barChart = new BarChart(dataForBars);
        barChart.draw();
   });
} 


$(document).ready(function(){
    resultType = getHttpParameter("type");
    var userkey = getHttpParameter("ukey");
    
    if (userkey != null && userkey !== undefined) {
    	loadQuestionaireDetails(userkey, resultType);   
    } else {
    	$('#diagnostic').parent().hide();
    }
    
    loadCountPerResultType();
});
