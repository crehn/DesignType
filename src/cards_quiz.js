
function Quiz() {
	debuglog('starting the quiz...');
	var countdownForAnswer = 10; // secs
	var numberOfQuestions = 2;
	
	var dimensions = new Array("simple", "powerful", "abstract", "concrete", "pragmatic", "idealistic", "robust", "technologic");
	var simpleCards = new Array();
	var powerfulCards = new Array();
	var abstractCards = new Array();
	var concreteCards = new Array();
	var pragmaticCards = new Array();
	var idealisticCards = new Array();
	var robustCards = new Array();
	var technologicCards = new Array();
	
	var allCardsAsJson = new Array();
	var questionIndizes = new Array();
	
	var quizResults = new Array();
	
	disableQuizStart();
	hideResultArea();
	
	// set triggers
	$("#answer-dimension").on('change', function () {
        fillComboboxCardNames();
    });	
	$("#store").on('click', function () {
        disableStoreButton();
        sendScore();
    });	
/* change ist kein gutes event
	$("#scorename").on('change', function () {
        if ($("#scorename").val().length > 3) {
			$("#store").removeAttr("disabled");
		} else {
			$("#store").attr("disabled", true);
		}
    });
*/
	
	// build question arrays and start quiz
	// TODO: besser und weniger callbacks...
	loadJSON2(buildCardsArray, chooseQuestionsRandomly, showQuestion);
		
	
    function disableQuizStart() {
        $("#startquiz").attr("disabled", true);
    }
	
	function enableQuizStart() {
        $("#startquiz").removeAttr("disabled");
    }	
	
	function showCountDown() {
		$("#countdown").show();
	}
	
	function hideCountDown() {
		$("#countdown").hide();
	}
	
	function showQuestionArea() {
		$("#quiz-questions").show();
	}
	
	function hideQuestionArea() {
		$("#quiz-questions").hide();
	}	
	
	function showResultArea() {
		$("#quiz-result-container").show();
	}
	
	function hideResultArea() {
		$("#quiz-result-container").hide();
	}

	function enableStoreButton() {
		$("#store").removeAttr("disabled");
	}

	function disableStoreButton() {
		$("#store").attr("disabled", true);
	}

	function sendScore() {
		$('#store-score').hide();
		var scorerName = $("#scorename").val();
		var scorerPoints = $('#scorepoints').val();
		//alert(scorerName + " reached " + scorerPoints + " points to store!");
		storeHighScore(scorerName, scorerPoints);
	}

    function storeHighScore(scorerName, scorerPoints) {
        debuglog("storeHighScore - send data...");

        $.post("./php/storeQuizScore.php", {
            userAlias: scorerName,
            score: scorerPoints
        }, function (data, status) {
            debuglog("status of storing score: " + status);
            confirmStoredScore(scorerName);
        }).fail(function (err) {
            debuglog(err.responseText);
        });
    }

	function confirmStoredScore(scorerName) {
		$('#store-commit').empty();
		$('#store-commit').html("<p>Thank you <strong>" + scorerName + "</strong>. You may play another quiz round by using the start button at the top.</p>");
		// immediately update the highscore
		loadHighscore();
	}

	function getCurrentQuestion() {
		// get current question
		var idxCurrentQuestion = questionIndizes[questionIndizes.length-1];
		var curCardDescription = allCardsAsJson[idxCurrentQuestion].long;
		var curCardName = allCardsAsJson[idxCurrentQuestion].name;
		var curDimension = allCardsAsJson[idxCurrentQuestion].shield;
		var curQuizQuestion = new QuizQuestion(curCardName, curDimension, curCardDescription);
		debuglog("current question is: " + curQuizQuestion.cardDimensionQuestion + "/" + curQuizQuestion.cardNameQuestion + "; located with internal index of: " + idxCurrentQuestion);
		quizResults.push(curQuizQuestion); // push to array to list question by question (later extended by its answer)
		questionIndizes.pop();// remove after usage to clear the array question by question
		
		return curQuizQuestion;
	}	

	function showQuestion() {
		// fill question into div
		var curQuizQuestion = getCurrentQuestion();
		$('#question-carddesc').text(curQuizQuestion.cardDescriptionQuestion);
		
		// reinitialize for each loop
		fillComboboxDimensions();
		resetComboboxCardNames();
		
		showQuestionArea();
		showCountDown();
		var countdown = new Countdown(countdownForAnswer, checkAnswer);
    }	
	
	function resetComboboxCardNames() {
		$('#answer-cardname').empty();
		var option = '<option value="none"></option>';
		$('#answer-cardname').append(option);
	}		
	
	function checkAnswer() {
		var choosenDimension = $('#answer-dimension').val();
		var choosenCardName = $('#answer-cardname').val();
		debuglog("choosenDimension: " + choosenDimension + "; choosenCardName: " + choosenCardName);
		//debuglog(quizResults.length);
		var curQuizQuestion = quizResults[quizResults.length-1];
		//debuglog(curQuizQuestion);
		curQuizQuestion.answerCardName(choosenCardName);
		curQuizQuestion.answerCardDimension(choosenDimension);
		curQuizQuestion.logResult();
		
		if (questionIndizes.length > 0) {
			showQuestion();	
		} else {
			// finished: show result
			showQuizResult();
			// and reset all for next quiz
			// hideQuestionArea(); TODO: reactivate!
			hideCountDown();
			enableQuizStart();
			alert("Finished Quiz!");
		}
	}
	
	function showQuizResult() {
		debuglog( "show quiz result...");
		$('#quiz-result').empty();
		$('#store-commit').empty();
		var achievedPoints = 0;
		var allAnswersCorrect = true;
		var resulthtml = '<table class="quiztable" cellpadding="5px"><thead><tr><td>No.</td><td>Question Description</td><td>Question Dimension</td><td>Answered Dimension</td><td>Question Card Name</td><td>Answered Card Name</td><td>Points</td></tr></thead><tbody>';
		for (var i=0;i<quizResults.length;i++){
			var classDim = (quizResults[i].cardDimensionQuestion === quizResults[i].cardDimensionAnswer) ? "quizright" : "quizwrong";
			var classCard = (quizResults[i].cardNameQuestion === quizResults[i].cardNameAnswer) ? "quizright" : "quizwrong";
			if (allAnswersCorrect){ allAnswersCorrect = (quizResults[i].cardNameQuestion === quizResults[i].cardNameAnswer); }
			achievedPoints += quizResults[i].countPoints();
		    resulthtml += '<tr><td class="quizno">#' + (1+i) + '</td><td class="quizdesc">' + quizResults[i].cardDescriptionQuestion + '</td><td class="'+classDim+'">' + quizResults[i].cardDimensionQuestion + '</td><td class="'+classDim+'">' + quizResults[i].cardDimensionAnswer + '</td><td class="'+classCard+'">' + quizResults[i].cardNameQuestion + '</td><td class="'+classCard+'">' + quizResults[i].cardNameAnswer + '</td><td class="quizpoints">'+quizResults[i].countPoints()+'</td></tr>';
		}
		if (allAnswersCorrect) { achievedPoints++ };
		var pointsTxt = (achievedPoints != 1) ? " points" : " point";
		var feedbackTxt = (achievedPoints > 0) ? " Congratulations! " : " Oh sorry! ";
		resulthtml += '</tbody></table>';
		resulthtml += '</p>'+feedbackTxt+'You achieved <strong>'+achievedPoints + '</strong>' + pointsTxt + (allAnswersCorrect ? " (including 1 bonus point for answering all correctly)" : "") + '.</p>';
		$('#quiz-result').html(resulthtml);
		$('#scorepoints').val(achievedPoints);
		$('#quiz-result-container').show();
		if (highscoreReached()) {
			enableStoreButton();
			$('#store-score').show();
		}
	}	
	
	function highscoreReached() {
		return true; // TODO
	}
	
	function fillComboboxDimensions() {
		//debuglog( "fill combobox dimensions...");
		$('#answer-dimension').empty();
		var option = '<option value="none"></option>';
		for (var i=0;i<dimensions.length;i++){
		   option += '<option value="'+ dimensions[i] + '">' + dimensions[i] + '</option>';
		}
		$('#answer-dimension').append(option);
	}	
	
	function fillComboboxCardNames() {
		//debuglog( "fill combobox card names...");
		var selectedDimension = $('#answer-dimension').val();
		var cardNamesOfSelectedDimension;
		debuglog( "selectedDimension: " + selectedDimension);
		switch (selectedDimension) {
			case 'simple': cardNamesOfSelectedDimension = simpleCards; break;
			case 'powerful': cardNamesOfSelectedDimension = powerfulCards; break;
			case 'abstract': cardNamesOfSelectedDimension = abstractCards; break;
			case 'concrete': cardNamesOfSelectedDimension = concreteCards; break;
			case 'pragmatic': cardNamesOfSelectedDimension = pragmaticCards; break;
			case 'idealistic': cardNamesOfSelectedDimension = idealisticCards; break;
			case 'robust': cardNamesOfSelectedDimension = robustCards; break;
			case 'technologic': cardNamesOfSelectedDimension = technologicCards; break;
			case 'none': cardNamesOfSelectedDimension = new Array(); break;// 
		}
		// empty and refill
		$('#answer-cardname').empty();
		var option = '<option value="none"></option>';
		for (var i=0;i<cardNamesOfSelectedDimension.length;i++){
		   option += '<option value="'+ cardNamesOfSelectedDimension[i].name + '">' + cardNamesOfSelectedDimension[i].name + '</option>';
		}
		$('#answer-cardname').append(option);
	}		

	// just for prototyping
	function loadJSON2(callback, callback2, callback3) {  
		$.getJSON("cards.json")
		  .done(function( json ) {
			//debuglog( "JSON Data: " + json.cards[ 1 ].name );
			callback(json, callback2, callback3);
		  })
		  .fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			debuglog( "ERROR: Loading json failed: " + err );
		});	
	}	
	
	function buildCardsArray(json, callback2, callback3) {
		debuglog( "buildCardsArray...");
		for (var i=0;i<json.cards.length;i++){
			//debuglog( "current card name: " + json.cards[i].name );
			if (isCardAllowedForQuiz(json.cards[i])) {
				allCardsAsJson.push(json.cards[i]);
				switch (json.cards[i].shield) {
					case 'simple': simpleCards.push(json.cards[i]); break;
					case 'powerful': powerfulCards.push(json.cards[i]); break;
					case 'abstract': abstractCards.push(json.cards[i]); break;
					case 'concrete': concreteCards.push(json.cards[i]); break;
					case 'pragmatic': pragmaticCards.push(json.cards[i]); break;
					case 'idealistic': idealisticCards.push(json.cards[i]); break;
					case 'robust': robustCards.push(json.cards[i]); break;
					case 'technologic': technologicCards.push(json.cards[i]); break;
				}
			}				
		}
		
		callback2(callback3);
	}		
	
	function isCardAllowedForQuiz(jsonCard) {
		if (jsonCard.shield === "question" || jsonCard.shield === "action" || jsonCard.shield === "joker") {
			return false;
		} else {
			return true;
		}
	}
	
	// old: has not the xml not wellformed problem like the one with $.getJSON but still does not work in combination with callback
	function loadJSON(callback) {   
		var xobj = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xobj.overrideMimeType("application/json");
		xobj.open('GET', './cards.json', true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
			  callback(JSON.parse(xobj.responseText));
			} else {
				// TODO: call callback with error
				alert("JSON load did not work!");
			}
		};
		xobj.send(null);  
	}
	
	function chooseQuestionsRandomly(callback3) {
		debuglog("choose " + numberOfQuestions + " questions randomly out of " + allCardsAsJson.length + "questions.");
		var uniqueMatches = 0;
		while(uniqueMatches < numberOfQuestions) {
			var curIdx = generateRandomNumber(0, allCardsAsJson.length);
			debuglog("current idx: " + curIdx + "; current question name: " + allCardsAsJson[curIdx].name);
			if (!questionIndizes.includes(curIdx)) {
				questionIndizes.push(curIdx);
			}
			uniqueMatches++;
		}
		callback3();
	}

	function generateRandomNumber(minNo, maxNo) {
		var randomNo = Math.random() * (maxNo - minNo) + minNo;
		return Math.floor(randomNo);
	}	
}

function Countdown(secondsToCount, _callback) {
	
	var timer = secondsToCount;
	var callback = _callback;
	countDown();
	
	function countDown() {
		if (timer >= 0) {
			$('#countdown').text(timer);
			//debuglog("countdown... " + timer);
			timer--;
			setTimeout(countDown, "1000");
		} else {
			callback();
		}
	}	
}

function QuizQuestion(cardNameQuestion, cardDimensionQuestion, cardDescriptionQuestion) {
	
	this.cardNameQuestion = cardNameQuestion;
	this.cardDimensionQuestion = cardDimensionQuestion;
	this.cardDescriptionQuestion = cardDescriptionQuestion;
	this.cardNameAnswer;
	this.cardDimensionAnswer;
	
	this.answerCardName = function(cardNameAnswer) {
		this.cardNameAnswer = cardNameAnswer;
	}	
	this.answerCardDimension = function(cardDimensionAnswer) {
		this.cardDimensionAnswer = cardDimensionAnswer;
	}	
	this.countPoints = function() {
		var points = 0;
		if (this.cardDimensionQuestion === this.cardDimensionAnswer) { points++; }
		if (this.cardNameQuestion === this.cardNameAnswer) { points++; }
		return points;
	}
	this.logResult = function() {
		debuglog("RESULT: \ncardNameQuestion: " + this.cardNameQuestion + "; cardDimensionQuestion: " + this.cardDimensionQuestion + "\ncardNameAnswer: " + this.cardNameAnswer + "; cardDimensionAnswer: " + this.cardDimensionAnswer + "\nPoints: " + this.countPoints());
	}	
}

function loadHighscore() {
	debuglog("request to load the highscore.");
    var highscoreData;
    $.when(
        $.get("./php/loadQuizHighscore.php", function (data, status) {
            debuglog("loadQuizHighscore - status: " + status + ", data: " + JSON.stringify(data));
            highscoreData = data;
        })
    ).then(function () {
        printHighscore(highscoreData);
    });
}

function printHighscore(highscoreData) {
    var highscorehtml = '<table cellpadding="5px"><thead><tr><td>Score</td><td>User</td><td>Date</td></tr></thead><tbody>';
    for (var i=0;i<highscoreData.length;i++){
        var alias = highscoreData[i].alias;
        var score = highscoreData[i].score;
        var resultdate = highscoreData[i].resultdate;
        highscorehtml += '<tr><td>' + score + '</td><td>' + alias + '</td><td>' + resultdate + '</td></tr>';
    }
    highscorehtml += '</tbody></table>';
    $('#highscore').empty();
    $('#highscore').html(highscorehtml);
}


$(document).ready(function () {
	
	loadHighscore();
	
    $("#startquiz").on('click', function () {
        new Quiz();
    });
	
});
