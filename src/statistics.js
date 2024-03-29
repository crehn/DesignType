//################### Statistics chart

function BarChart(dataForBars, htmlElementIdForDrawing) {
    //var width = Math.min(800, $("#statsbox").width());
    var width = Math.min(800, $("#" + htmlElementIdForDrawing).width());
    var height = 0.3 * width;
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };

    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.2);
    var y = d3.scaleLinear().range([innerHeight, 0]);

    this.draw = function () {
        //draw();
        draw(htmlElementIdForDrawing);
    };

    function draw() {
        var svg = d3.select("#" + htmlElementIdForDrawing).append("svg")
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
        var xAxis = d3.axisBottom()
            .scale(x);
        x.domain(dataForBars.map(function (d) { return d.type; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);
    }

    function drawYAxis(svg) {
        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(10, "%");
        y.domain([0, d3.max(dataForBars, function (d) { return d.amount; })]);

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
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.type); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.amount); })
            .attr("height", function (d) { return innerHeight - y(d.amount); });
    }

    function drawPercentValues(svg) {
        var txt = svg.selectAll(".txtstat")
            .data(dataForBars)
            .enter().append("text")
            .attr("x", function (d) { return x(d.type) + (x.bandwidth() / 2); })
            .attr("y", function (d) { return y(d.amount) - (margin.top / 2); })
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

function HorizontalBarChart(dataForBars, elementName) {
    var width = Math.min(800, $("#" + elementName).width());
    var height = 0.8 * width;
    var margin = { top: 20, right: 20, bottom: 30, left: 40 };

    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var x = d3.scaleLinear().range([0, innerWidth]);
    var y = d3.scaleBand().rangeRound([innerHeight, 0]).padding(0.2);

    this.draw = function () {
        draw();
    };

    function draw() {
        var svg = d3.select("#" + elementName).append("svg")
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
        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(10, "%");
        x.domain([0, 1]);
        //x.domain([0, d3.max(dataForBars, function(d) { return d.percentage; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);
    }

    function drawYAxis(svg) {
        var yAxis = d3.axisLeft()
            .scale(y);
        y.domain(dataForBars.map(function (d) { return d.overallIndex; }));

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
        var bar = svg.selectAll(".bar" + elementName)
            .data(dataForBars)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("y", function (d) { return y(d.overallIndex); })
            .attr("height", y.bandwidth())
            //.attr("x", function(d) { return x(d.percentage); })
            .attr("x", 0)
            .attr("width", function (d) { return x(d.percentage); });
    }

    function drawPercentValues(svg) {
        var txt = svg.selectAll(".txtstat" + elementName)
            .data(dataForBars)
            .enter().append("text")
            .attr("y", function (d) { return y(d.overallIndex) + (y.bandwidth() / 2); })
            .attr("x", 2)
            .attr("dy", ".3em")
            .text(getStatementText)
            .style("text-anchor", "left")
            .style("font-size", ".8em");
    }

    function getStatementText(d) {
        var statement = (statements[d.attribute][d.index]).replace(/<\/?code\>/g, "'").replace(/&quot;/g, "'");
        return (Math.round(d.percentage * 100)) + " %: " + d.attribute + ": " + statement;
    }
}

function XYBarChart(dataForBars, elementName) {
    var width = Math.min(800, $("#" + elementName).width());
    var height = 0.5 * width;
    var margin = { top: 20, right: 40, bottom: 30, left: 40 };

    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.2);
    var y = d3.scaleLinear().range([innerHeight, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(function (d) { return x(d.curExperience) + x.bandwidth() / 2; })
        .y(function (d) { return y(d.curValue); });

    this.draw = function () {
        draw();
    };

    var seriesNames = ["simple", "abstract", "idealistic", "robust"];
    var dims = seriesNames.map(function (name) {
        return {
            name: name,
            values: dataForBars.map(function (d) {
                return { curExperience: d.experience, curValue: +d[name] };
            })
        };
    });

    color.domain(seriesNames);

    function draw() {
        var svg = d3.select("#" + elementName).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        drawXAxis(svg);
        drawYAxis(svg);
        drawLines(svg);
        drawMiddleLine(svg);
    }

    function drawXAxis(svg) {
        var xAxis = d3.axisBottom()
            .scale(x);

        //x.domain([0, 1]);
        x.domain(dataForBars.map(function (d) { return d.experience; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);
    }

    function drawYAxis(svg) {
        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(10, "%");

        var maxVal = calcMaxOfObjArray(dataForBars);
        //debuglog("maxVal: " + maxVal);
        //y.domain([0, maxVal]);
        y.domain([0, 1]);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
    }

    function drawLines(svg) {
        var dimension = svg.selectAll(".dimension")
            .data(dims)
            .enter().append("g")
            .attr("class", "dimension");

        dimension.append("path")
            .attr("class", "line")
            .attr("d", function (d) { return line(d.values); })
            //.style("stroke", "red");
            .style("stroke", function (d) { return color(d.name); });

        dimension.append("text")
            .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
            .attr("transform", function (d) { /*debuglog(x(d.value.curExperience) + " curExp|curVal " + y(d.value.curValue)); */ return "translate(" + x(d.value.curExperience) + "," + y(d.value.curValue) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .attr("dx", "3em")
            .style("stroke", function (d) { return color(d.name); })
            .text(function (d) { return d.name; });
    }

    function drawMiddleLine(svg) {
        svg.append("g")
            .append("line")
            .attr("class", "line")
            .attr("x1", 0)
            .attr("y1", y(0.5))
            .attr("x2", innerWidth)
            .attr("y2", y(0.5))
            .style("stroke", "black")
            .style("stroke-dasharray", "5,5");
        //debuglog("draw line");
    }
}


function calcMaxOfObjArray(dataForBars) {
    var max = d3.max(dataForBars, function (array) {
        var valArray = d3.values(array);
        valArray = valArray.filter(function (value) {
            return typeof value === "number";
        });
        // debuglog("cur array vals: " + valArray);
        return d3.max(valArray);
    });
    return max;
}


//###################

function loadCountSurveyParticipants() {
    $.get("./php/loadCountSurveyParticipants.php", function (data, status) {
        debuglog("loadCountSurveyParticipants - status: " + status + ", data: " + data);
        $("#amount_survey_participants").html(data);
    });
}

function loadCountPerResultType() {
    var dataForBars;
    $.when(
        $.get("./php/loadCountPerResultType.php", function (data, status) {
            debuglog("loadCountPerResultType - status: " + status + ", data: " + JSON.stringify(data));
            dataForBars = data;
        })
    ).then(function () {
        var barChart = new BarChart(dataForBars, "statsbox");
        barChart.draw();
    });
}

function loadTopsAndFlops() {
    var dataForTopsAndFlopsBars;
    $.when(
        $.get("./php/loadTopAndFlopStatements.php", function (data, status) {
            debuglog("loadTopAndFlopStatements - status: " + status + ", data: " + JSON.stringify(data));
            dataForTopsAndFlopsBars = data;
        })
    ).then(function () {
        var hbarChartTop = new HorizontalBarChart(dataForTopsAndFlopsBars, "statementsbox");
        hbarChartTop.draw();
    });
}

function loadDimensionsByExperience() {
    var dataDimsByExp;
    $.when(
        $.get("./php/loadDimensionsByExperience.php", function (data, status) {
            debuglog("loadDimensionsByExperience - status: " + status + ", data: " + JSON.stringify(data));
            dataDimsByExp = data;
        })
    ).then(function () {
        var xyChart = new XYBarChart(dataDimsByExp, "dimensionsexpbox");
        xyChart.draw();
    });
}

function loadTopDimensionsByRole(roleNameVal) {
    var dataForBars;
    //var roleNameVal = "Architect";
    $.when(
        $.get("./php/loadTopDimensionsByRole.php", { rolename: roleNameVal }, function (data, status) {
            debuglog("loadTopDimensionsByRole - status: " + status + ", data: " + JSON.stringify(data));
            dataForBars = data;
        })
    ).then(function () {
        var barChart = new BarChart(dataForBars, "top4dimensionsgraph");
        barChart.draw();
    });
}

$(document).ready(function () {
    loadCountSurveyParticipants();

    loadCountPerResultType();

    loadTopsAndFlops();

    loadDimensionsByExperience();

    loadTopDimensionsByRole("Architect");
    $("#rolename").change(function () {
        // remove old one
        $("#top4dimensionsgraph").children().remove();
        // create new one
        var rolename = $("#rolename").val();
        loadTopDimensionsByRole(rolename);
    });

    /*
    var dataForBars =[{"index":1,"percentage":0.05},{"index":2,"percentage":0.12},{"index":3,"percentage":0.01},{"index":4,"percentage":0.08},{"index":5,"percentage":0.04},{"index":6,"percentage":0.43},{"index":7,"percentage":0.23}];

    var hbarChartTop = new HorizontalBarChart(dataForBars, "topbox");
    debuglog("build hbarchart top");
    hbarChartTop.draw();
   
    
    var dataForBars =[
	  {"experience":"0-3","simple":5,"powerful":12,"abstract":8,"concrete":11,"pragmatic":23,"idealistic":9,"robust":14,"technologic":11},
	  {"experience":"4-6","simple":12,"powerful":21,"abstract":12,"concrete":21,"pragmatic":12,"idealistic":17,"robust":28,"technologic":18},
	  {"experience":"7-9","simple":1,"powerful":21,"abstract":32,"concrete":9,"pragmatic":4,"idealistic":11,"robust":10,"technologic":31},
	  {"experience":"10-12","simple":8,"powerful":28,"abstract":14,"concrete":15,"pragmatic":15,"idealistic":19,"robust":22,"technologic":1},
	  {"experience":"13-15","simple":4,"powerful":16,"abstract":2,"concrete":23,"pragmatic":9,"idealistic":21,"robust":41,"technologic":21},
	  {"experience":"16-20","simple":43,"powerful":83,"abstract":29,"concrete":43,"pragmatic":45,"idealistic":13,"robust":19,"technologic":45},    
	  {"experience":"over 20","simple":23,"powerful":33,"abstract":18,"concrete":9,"pragmatic":17,"idealistic":6,"robust":3,"technologic":19}];
	               
	var xyChart = new XYBarChart(dataForBars, "dimensionsexpbox");
	debuglog("build xyChart");
	xyChart.draw();
	*/
});

