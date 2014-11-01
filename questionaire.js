function Dimension(value1, value2) {
    var NUMBER_OF_STATEMENTS_NEEDED = 5;
    var SUPPLY_CORRECT_NUMBER_OF_STATEMENTS = "Check exactly five stametements!";

    var wasOnceComplete = false;
    var score1 = 0;
    var score2 = 0;
    
    var group = $("#" + value1 + "-vs-" + value2);
    var groupName = group.children("h1").children(".group-name");
    var groupNumber = group.children("h1").children(".group-number");
    var panel1 = $(".dimension #" + value1);
    var panel2 = $(".dimension #" + value2);
    var errorBox = createErrorBox();
    
    this.value1 = value1;
    this.value2 = value2;
    
    function createErrorBox() {
        var box = $("<div/>", {
            "class": "alert alert-danger",
            html: "<strong>Hint:</strong> " + SUPPLY_CORRECT_NUMBER_OF_STATEMENTS,
            style: "display:none; margin:1em;"});
        $(".dimension#" + id()).append(box);
        return box;
    };
    
    function id() {
        return value1 + "-vs-" + value2;
    };
    
    this.update = function() {
        computeScores();
        checkForCompleteness();
        checkForError();
        checkForSuccess();
    }
    
    function computeScores() {
        score1 = count(value1);
        score2 = count(value2);
    
        if (isComplete()) {
            wasOnceComplete = true;
        }
    }
    
    function count(id) {
        return $(".dimension #" + id + " :checked").length;
    }

    function checkForCompleteness() {
        if (wasOnceComplete) {
            if (isComplete()) {
                group.addClass("complete");
                group.removeClass("incomplete");
            } else {
                group.addClass("incomplete");
                group.removeClass("complete");
            }
        }
    }
    
    function checkForError() {
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
                markPanel(panel1);
                unmarkPanel(panel2);
            } else if (score1 < score2) {
                unmarkPanel(panel1);
                markPanel(panel2);
            } else {
                unmarkPanel(panel1);
                unmarkPanel(panel2);
            }
        } else {
            if (score1 > score2) {
                markPanelTentative(panel1);
                unmarkPanel(panel2);
            } else if (score1 < score2) {
                unmarkPanel(panel1);
                markPanelTentative(panel2);
            } else {
                unmarkPanel(panel1);
                unmarkPanel(panel2);
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
    
    this.reveal= function() {
        showGroupName();
        showPanel(panel1);
        showPanel(panel2);
        removeGroupBorder();
    }
    
    function showGroupName() {
        groupName.show();
        groupNumber.hide();
    }
    
    function showPanel(panel) {
        panel.addClass("panel");
        headerOf(panel).show();
    }
    
    function headerOf(panel) {
        return panel.children(".panel-heading").show();
    }
    
    function removeGroupBorder() {
        group.removeClass("bordered");
    }
};


function Questionaire() {
    var SUPPLY_CORRECT_NUMBER_OF_STATEMENTS = "Check exactly 5 stametements in each group!";
    
    $("#types").accordion({ 
        collapsible: true,
        active: false ,
        heightStyle: "content"
    });

    var dimensions = [
        new Dimension("simple", "powerful"),
        new Dimension("abstract", "concrete"),
        new Dimension("pragmatic", "idealistic"),
        new Dimension("technologic", "robust")
    ];
    
    this.update = function() {
        for (dim in dimensions) {
            dimensions[dim].update();
        }
        $("#resultString").html("<strong>Result:</strong> Your design type is <strong>" + getDesignType() + "</strong>.");
        
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
        $("#types h2").removeClass("marked");
        $("#" + type.toLowerCase()).addClass("marked");
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
    
    this.finish = function() {
        if (! isComplete()) {
            $("#globalErrorBox").show("slow");
        } else {
            $("#globalErrorBox").hide("slow");
            for (dim in dimensions) {
                dimensions[dim].reveal();
            }
        }
    }
}
 
$(document).ready(function() {
    window.questionaire = new Questionaire();

    $(".dimension input").on('click', function() {
        questionaire.update();
    });
    
    $("#finish").on('click', function() {
        questionaire.finish();
    });
});

