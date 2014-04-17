function dimension(value1, value2) {
    var NUMBER_OF_STATEMENTS_NEEDED = 5;
    var SUPPLY_CORRECT_NUMBER_OD_STATEMENTS = "Check exactly 5 stametements!";


    var wasOnceComplete = false;
    var score1 = 0;
    var score2 = 0;
    
    var box1 = $(".dimension #" + value1);
    var box2 = $(".dimension #" + value2);
    var errorBox = createErrorBox();
    
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
    
    this.check = function() {
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
            return value1[0].toUpperCase();
        } else {
            return value2[0].toUpperCase();
        }
    };
};

 
$(document).ready(function() {
    var dimensions = [
        new dimension("simple", "powerful"),
        new dimension("abstract", "concrete"),
        new dimension("pragmatic", "idealistic"),
        new dimension("technology", "stability")
    ];

    $(".dimension input").on('click', function() {
        for (dim in dimensions) {
            dimensions[dim].check();
        }
        $("#resultDiv").html("<strong>Result:</strong> Your design type is <strong>" + getDesignTypeFor(dimensions) + "</strong>.");
    });
    
    $(".result .types a").on('click', function(event) {
        $(".result .type").hide();
        $(".types .list-group-item").removeClass("active");
        $("#" + this.text.toLowerCase()).show("fast");
        event.preventDefault();
    });
    
});

function getDesignTypeFor(dimensions) {
    var result = "";
    for (dim in dimensions) {
        result += dimensions[dim].resultAsChar();
    }
    return result;
}

