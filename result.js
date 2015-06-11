function Dimension(value1, value2) {
    this.value1 = value1;
    this.value2 = value2;
}

function Result() {

    var dimensions = [
        new Dimension("simple", "powerful"),
        new Dimension("abstract", "concrete"),
        new Dimension("pragmatic", "idealistic"),
        new Dimension("technologic", "robust")
    ];
    
    this.show = function() {
        var type = getDesignType();
        if (type !== "") {
            showDesignType(type);
        }
    }

    function getDesignType() {
        return getParameterByName("type").substr(0, 4);
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function showDesignType(type) {
        $("#resultString").html("<strong>Result:</strong> Your design type is <strong>" + type + "</strong>.");
        
        $("#" + type.toLowerCase()).show();
        $("#" + type.toLowerCase()).next().show();
    }

    function typeToIndex(type) {
        // the types are ordered just if they were binary numbers. value1 (left) is a binary 0, value2 (right) a binary 1.
        var result = 0;
        for (i = 0; i < dimensions.length; i++) {
            var position = dimensions.length -1 - i;
            var digit = type[i].toLowerCase() == dimensions[i].value1[0] ? 0 : 1;
            result += Math.pow(2, position) * digit;
        }
        return result;
    }
}

$(document).ready(function() {
    var result = new Result();
    result.show();
});

