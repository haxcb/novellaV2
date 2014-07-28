
var choicesIndex;
var questionIndex;
var quizObject;
var quizScore;

function quizStart(quizIndex) {
   choicesIndex = 0;
   questionIndex = 0;
   quizIndex = 0; 
   quizScore = 0;
   quizObject = quiz_jsonParser.jsonData.objects[quizIndex];
} 

function compareAnswer(){
	var radio_oj = $("#choices_form .radio_choices");
	var temp_question = quizObject.questions[questionIndex]
	var temp_answer = temp_question.answer;
	var student_answer;
	var temp_answerIndex;
	
	switch(temp_answer)
	{
		case "A": 
			temp_answerIndex = 0;
			break;
		case "B":
			temp_answerIndex = 1;
			break;
		case "C": 
			temp_answerIndex = 2;
			break;
		case "D":
			temp_answerIndex = 3;
			break;
		default:
			temp_answerIndex = 100;
	}

	for(var i = choicesIndex; i<choicesIndex+4; i++) {
		if(radio_oj[i].checked == true){
			student_answer = radio_oj[i].value;
			calculateScore(temp_answerIndex, student_answer);
			break;
		}
	}
	choicesIndex += 4;
	questionIndex += 1;
}

function calculateScore(correct_answer, student_answer){
	if (correct_answer == student_answer){
		return quizScore++;
	} else if(quizScore > 0){
		return quizScore--;
	}
}

function submitQquiz(){
	compareAnswer();
	alert("your score is:" + quizScore);
	quizGrade_jsonParser.jsonData.quiz[0].grade = quizScore;
}

