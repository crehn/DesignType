String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function Dimension(leftValue, rightValue) {
    this.leftValue = leftValue;
    this.rightValue = rightValue;
}

function Type(value1, value2, value3, value4) {
    var header = createHeader();
    var panel = createPanel();
    
    function createHeader() {
        var result = $("#templateTypeName").clone();
        result.attr("id", abbreviation());
        result.text(abbreviation().toUpperCase() + ": " + typesData[abbreviation()].name);
        $("#types").append(result);
        return result;
    }
    
    this.abbreviation = function() {
        return abbreviation();
    }
    
    function abbreviation() {
        return value1[0].toLowerCase()
            + value2[0].toLowerCase()
            + value3[0].toLowerCase()
            + value4[0].toLowerCase();
    }
    
    function createPanel() {
        var result = $("#templateType").clone();
        result.attr("id", abbreviation() + "_info");
        result.find(".attributes").html(buildAttributes());
        result.find(".description").html(typesData[abbreviation()].description);
        result.find(".designs").html(typesData[abbreviation()].designs);
        result.find(".programming").html(typesData[abbreviation()].programming);
        result.find(".principles-liked").html(arrayToCommaList(typesData[abbreviation()].principlesLiked));
        result.find(".principles-disregarded").html(arrayToCommaList(typesData[abbreviation()].principlesDisregarded));
        result.find(".strengths").html(arrayToUl(typesData[abbreviation()].strengths));
        result.find(".suggestions").html(arrayToUl(typesData[abbreviation()].suggestions));
        result.find(".further-reading").html(arrayToUl(typesData[abbreviation()].furtherReading));
        $("#types").append(result);
        return result;
    }
    
    function buildAttributes() {
        return attribute(value1) + attribute(value2) + attribute(value3) + attribute(value4);
    }
    
    function attribute(value) {
        return '<a class="dont-print-url" href="dimensions.html?dimension=' + value + '">' + value.capitalize() + '</a> ';
    }
    
    function arrayToUl(array) {
        var result = "<ul>";
        for (a in array) {
            result += "<li>" + array[a] + "</li>";
        }
        result += "</ul>";
        return result;
    }
    
    function arrayToCommaList(array) {
        return array.join(", ");
    }
}

function Types() {
    var dimensions = [
        new Dimension("simple", "powerful"),
        new Dimension("abstract", "concrete"),
        new Dimension("pragmatic", "idealistic"),
        new Dimension("technologic", "robust")
    ];
    
    var types = buildTypes();
    
    function buildTypes() {
        var result = {};
        for (i = 0; i < 16; i++) {
            result[i] = indexToType(i);
            console.log("built type number " + i + ": " + result[i].abbreviation());
        }
        return result;
    }
    
    function indexToType(index) {
        var digit1 = Math.floor(index / 8);
        var digit2 = Math.floor(index % 8 / 4);
        var digit3 = Math.floor(index % 4  / 2);
        var digit4 = Math.floor(index % 2);
        var value1 = digitToValue(digit1, dimensions[0]);
        var value2 = digitToValue(digit2, dimensions[1]);
        var value3 = digitToValue(digit3, dimensions[2]);
        var value4 = digitToValue(digit4, dimensions[3]);
        return new Type(value1, value2, value3, value4);
    }
    
    function digitToValue(digit, dimension) {
        return digit === 0 ? dimension.leftValue : dimension.rightValue;
    }
    
    this.showResultingDesignType = function() {
        var type = getResultingDesignType();
        if (type !== "") {
            showDesignType(type);
        }
    }

    function getResultingDesignType() {
        return getParameterByName("type").substr(0, dimensions.length);
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function showDesignType(type) {
        $("#resultString").html("<strong>Result:</strong> Your design type is <strong>" + type + "</strong>.");
        
        $("#types").accordion("option", "active", typeToIndex(type));
        $("#types h2").removeClass("marked");
        $("#" + type.toLowerCase()).addClass("marked");
    }

    function typeToIndex(type) {
        // the types are ordered just if they were binary numbers. value1 (left) is a binary 0, value2 (right) a binary 1.
        var result = 0;
        for (i = 0; i < dimensions.length; i++) {
            var position = dimensions.length -1 - i;
            var digit = type[i].toLowerCase() == dimensions[i].leftValue[0] ? 0 : 1;
            result += Math.pow(2, position) * digit;
        }
        return result + 1; // plus template
    }
}


$(document).ready(function() {
    var types = new Types();
    $("#templateTypeName").hide();
    $("#templateType").hide();

    $("#types").accordion({ 
        collapsible: true,
        active: false ,
        heightStyle: "content"
    });
    
    types.showResultingDesignType();
});

