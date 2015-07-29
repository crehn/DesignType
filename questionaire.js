String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function Dimension(leftValue, rightValue, statements, number) {
    var NUMBER_OF_STATEMENTS_NEEDED = 5;
    var SUPPLY_CORRECT_NUMBER_OF_STATEMENTS = "Check exactly five stametements!";

    var wasOnceComplete = false;
    var score1 = 0;
    var score2 = 0;
    
    this.leftValue = leftValue;
    this.rightValue = rightValue;
    
    var group = createGroup();
    var groupName = group.find(".group-name");
    var groupNumber = group.find(".group-number");
    var panel1 = $(".dimension #" + leftValue);
    var panel2 = $(".dimension #" + rightValue);
    var errorBox = createErrorBox();
    
    function createGroup() {
        var group = $("#template").clone();
        group.attr("id", id());
        fillPanel(group.find("#leftValue"), leftValue, statements[leftValue]);
        fillPanel(group.find("#rightValue"), rightValue, statements[rightValue]);
        group.find(".group-name").text(leftValue.capitalize() + " vs. " + rightValue.capitalize());
        group.find(".group-number").text("Group " + number);
        $("#dimensions").append(group);
        return group;
    }
    
    function id() {
        return leftValue + "-vs-" + rightValue;
    };
    
    function fillPanel(panel, value, statements) {
        panel.attr("id", value);
        panel.find(".panel-heading").text(value);
        for (statement in statements) {
            var li = $("<li/>");
            li.append($("<input/>", {
                id: "stmt_" + value + statement,
                type: "checkbox"
            }));
            li.append(" ");
            li.append(statements[statement]);
            panel.find("ul").append(li);
        }
    }
    
    function createErrorBox() {
        var box = $("<div/>", {
            "class": "alert alert-danger",
            html: "<strong>Hint:</strong> " + SUPPLY_CORRECT_NUMBER_OF_STATEMENTS,
            style: "display:none; margin:1em;"});
        $(".dimension#" + id()).append(box);
        return box;
    };
    
    this.update = function() {
        computeScores();
        checkForCompleteness();
        checkForError();
        checkForSuccess();
    }
    
    function computeScores() {
        score1 = count(leftValue);
        score2 = count(rightValue);
    
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
            return leftValue[0];
        } else {
            return rightValue[0];
        }
    };
    
    this.reveal = function() {
        showGroupName();
        showPanel(panel1);
        showPanel(panel2);
        removeGroupBorder();
        showRevealText();
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
    
    function showRevealText() {
        $(".only-revealed").show();
    }
};


function Questionaire(prefix) {
    var SUPPLY_CORRECT_NUMBER_OF_STATEMENTS = "Check exactly five stametements in each group!";
    var RESULT_STRING = '<strong>Result:</strong> The resulting design type is <a href="types.html?type=${type}"><strong>${type}</strong>.';

    var dimensions = [
        new Dimension("simple", "powerful", statements, 1),
        new Dimension("abstract", "concrete", statements, 2),
        new Dimension("pragmatic", "idealistic", statements, 3),
        new Dimension("technologic", "robust", statements, 4)
    ];
    
    this.update = function() {
        for (dim in dimensions) {
            dimensions[dim].update();
        }
        var type = getDesignType();
        $("#resultString").html(RESULT_STRING.replace(/\$\{type\}/g, type));
    }
    
    this.getDesignType = function() {
        return getDesignType();
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
    
    this.finish = function() {
        if (! isComplete()) {
            $("#globalErrorBox").show("slow");
        } else {
            $("#globalErrorBox").hide();
            window.location.href='submit.html?type='+questionaire.getDesignType();
        }
    }
    
    this.reveal = function() {
        for (dim in dimensions) {
            dimensions[dim].reveal();
        }
        $("#result").show();
        $("#controls").hide();
    }
    
    this.save = function() {
        var checkboxes = $(":checkbox");
        for (cb in checkboxes) {
            localStorage[prefix + "." + checkboxes[cb].id] = checkboxes[cb].checked;
        }
    }
    
    this.load = function() {
        var checkboxes = $(":checkbox");
        for (cb in checkboxes) {
            checkboxes[cb].checked = (localStorage[prefix + "." + checkboxes[cb].id] === "true");
        }
        this.update();
    }
    
    this.clear = function() {
        var checkboxes = $(":checkbox");
        for (cb in checkboxes) {
            checkboxes[cb].checked = false;
        }
        localStorage.clear();
        this.update();
    }
}
 
$(document).ready(function() {
    window.questionaire = new Questionaire(prefix);
    $("#template").hide();

    $(".dimension :checkbox").click(function() {
        questionaire.update();
        questionaire.save();
    });
    
    $("#continue").on('click', function() {
        questionaire.finish();
    });
    
    $("#load").click(function() {
        questionaire.load();
    });
    
    $("#clear").click(function() {
        questionaire.clear();
    });
    
    if (window.location.search === "?revealed") {
        questionaire.reveal();
    }
});

