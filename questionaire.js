function Dimension(value1, value2) {
    var NUMBER_OF_STATEMENTS_NEEDED = 5;
    var SUPPLY_CORRECT_NUMBER_OD_STATEMENTS = "Check exactly 5 stametements!";

    var wasOnceComplete = false;
    var score1 = 0;
    var score2 = 0;
    
    var box1 = $(".dimension #" + value1);
    var box2 = $(".dimension #" + value2);
    var errorBox = createErrorBox();
    
    this.value1 = value1;
    this.value2 = value2;
    
    function createErrorBox() {
        var box = $("<div/>", {
            "class": "alert alert-danger",
            html: "<strong>Hint:</strong> " + SUPPLY_CORRECT_NUMBER_OD_STATEMENTS,
            style: "display:none"});
        $(".dimension#" + id()).append(box);
        return box;
    };
    
    function id() {
        return value1 + "-vs-" + value2;
    };
    
    this.update = function() {
        computeScores();
        checkForError();
        checkForSuccess();
    }
    
    function computeScores() {
        score1 = count(value1);
        score2 = count(value2);
    }
    
    function count(id) {
        return $(".dimension #" + id + " :checked").length;
    }
    
    function checkForError() {
        if (isComplete()) {
            wasOnceComplete = true;
        }
    
        if (isError()) {
            errorBox.show("slow");
        } else {
            errorBox.hide("slow");
        }
    }
    
    this.isComplete = function() {
        return isComplete();
    };
        
    function isComplete() {
        return (score1 + score2) == NUMBER_OF_STATEMENTS_NEEDED;
    }
    
    function isError() {
        return score1 + score2 > NUMBER_OF_STATEMENTS_NEEDED
            || (wasOnceComplete && !isComplete());
    }
    
    function checkForSuccess() {
        if (isComplete()) {
            if (score1 > score2) {
                markPanel(box1);
                unmarkPanel(box2);
            } else if (score1 < score2) {
                unmarkPanel(box1);
                markPanel(box2);
            } else {
                unmarkPanel(box1);
                unmarkPanel(box2);
            }
        } else {
            if (score1 > score2) {
                markPanelTentative(box1);
                unmarkPanel(box2);
            } else if (score1 < score2) {
                unmarkPanel(box1);
                markPanelTentative(box2);
            } else {
                unmarkPanel(box1);
                unmarkPanel(box2);
            }
        }
    }
        
    function markPanel(panel) {
        panel.removeClass("panel-default");
        panel.removeClass("panel-warning");
        panel.addClass("panel-success");
    }
    
    function markPanelTentative(panel) {
        panel.removeClass("panel-default");
        panel.removeClass("panel-success");
        panel.addClass("panel-warning");
    }
    
    function unmarkPanel(panel) {
        panel.removeClass("panel-success");
        panel.removeClass("panel-warning");
        panel.addClass("panel-default");
    }
    
    this.resultAsChar = function() {
        if (! isComplete())
            return "?";
            
        if (score1 > score2) {
            return value1[0];
        } else {
            return value2[0];
        }
    };
};


function Questionaire() {
    $("#types").accordion({ 
        collapsible: true,
        active: false 
    });

    var dimensions = [
        new Dimension("simple", "powerful"),
        new Dimension("abstract", "concrete"),
        new Dimension("pragmatic", "idealistic"),
        new Dimension("technology", "stability")
    ];
    
    this.update = function () {
        for (dim in dimensions) {
            dimensions[dim].update();
        }
        $("#resultDiv").html("<strong>Result:</strong> Your design type is <strong>" + getDesignType() + "</strong>.");
        
        if (isComplete()) {
            showType(getDesignType());
        }
    }

    function getDesignType() {
        var result = "";
        for (dim in dimensions) {
            result += dimensions[dim].resultAsChar();
        }
        return result.toUpperCase();
    }
    
    function isComplete() {
        for (dim in dimensions) {
            if (! dimensions[dim].isComplete()) {
                return false;
            }
        }
        return true;
    }
    
    function showType(type) {
        $("#types").accordion("option", "active", typeToIndex(type));
    }
    
    function typeToIndex(type) {
        // the types are ordered just if they were binary numbers. value1 (left) is a binary 0, value2 (right) a binary 1.
        var result = 0;
        for (i = 0; i < dimensions.length; i++) {
            var position = dimensions.length -1 - i;
            var digit = dimensions[i].resultAsChar() == dimensions[i].value1[0] ? 0 : 1;
            result += Math.pow(2, position) * digit;
        }
        return result;
    }
}
 
$(document).ready(function() {
    var questionaire = new Questionaire();

    $(".dimension input").on('click', function() {
        questionaire.update();
    });
});

