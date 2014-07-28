////////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2014 (C) Team2 Group I.  All rights reserved.
//
//  File Name: jsonParser.js
// 
//  Author: team 1
//
//	bug: Unknown
//
//	version: 2.0
//
////////////////////////////////////////////////////////////////////////////////

// ======================== METHOD START ====================================

/////////////////////////////////////////////////////////////////////////////
//   Function   :	loadQuestion
//
//   Description:	load participation question from json data
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function loadQuestion() {
	
	// get json data
	var question = paticipation_jsonParser.jsonData.question;
    var answerA = paticipation_jsonParser.jsonData.item.a;
	var answerB = paticipation_jsonParser.jsonData.item.b;
	var answerC = paticipation_jsonParser.jsonData.item.c;
	var answerD = paticipation_jsonParser.jsonData.item.d;
	var answerE = paticipation_jsonParser.jsonData.item.e;
	
	// reference and update DOM
    $("#questionInput").html(question);
	$("#answer_a").html(answerA);
	$("#answer_b").html(answerB);
	$("#answer_c").html(answerC);
	$("#answer_d").html(answerD);
	$("#answer_e").html(answerE);
 }

/////////////////////////////////////////////////////////////////////////////
//   Function   :	showStatis
//
//   Description:	show the pie chart according the json data
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function showStatis() {
	// submit participation to back-end
	paticipation_jsonParser.addPaticipation();
	// load statistic data from json
	loadStaData();
	
	// show and draw the pie chart
	$("#bar_div").show();
	$( pieChart );
} 


/////////////////////////////////////////////////////////////////////////////
//   Function   :	loadStaData
//
//   Description:	load statistic data from json
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function loadStaData() {
	// load data from json
    var stat_answer_a = paticipation_jsonParser.jsonData.item.a;
	var stat_answer_b = paticipation_jsonParser.jsonData.item.b;
	var stat_answer_c = paticipation_jsonParser.jsonData.item.c;
	var stat_answer_d = paticipation_jsonParser.jsonData.item.d;
	var stat_answer_e = paticipation_jsonParser.jsonData.item.e;
	
	// reference and update DOM
	$("#stat_answer_a").html(stat_answer_a);
	$("#stat_answer_b").html(stat_answer_b);
	$("#stat_answer_c").html(stat_answer_c);
	$("#stat_answer_d").html(stat_answer_d);
	$("#stat_answer_e").html(stat_answer_e);
	
	// load data from json
    var percentage_a = paticipation_jsonParser.jsonData.percentage.a;
	var percentage_b = paticipation_jsonParser.jsonData.percentage.b;
	var percentage_c = paticipation_jsonParser.jsonData.percentage.c;
	var percentage_d = paticipation_jsonParser.jsonData.percentage.d;
	var percentage_e = paticipation_jsonParser.jsonData.percentage.e;
	
	// reference and update DOM
	$("#percentage_a").html(percentage_a);
	$("#percentage_b").html(percentage_b);
	$("#percentage_c").html(percentage_c);
	$("#percentage_d").html(percentage_d);
	$("#percentage_e").html(percentage_e);
} 

/////////////////////////////////////////////////////////////////////////////
//   Function   :	updatePaticipationQuestion
//
//   Description:	teacher update the Participation Question
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function updatePaticipationQuestion() {
	
	// reference and get value of DOM
	var paticipationQuestion = document.getElementById('paticipationQuestion').value;
	var choiceA = document.getElementById('paticipationChoiceA').value;
	var choiceB = document.getElementById('paticipationChoiceB').value;
	var choiceC = document.getElementById('paticipationChoiceC').value;
	var choiceD = document.getElementById('paticipationChoiceD').value;
	var choiceE = document.getElementById('paticipationChoiceE').value;
	
	// if the question or choices are blank
	if(!isQuestionAvailable(paticipationQuestion,choiceA,choiceB,choiceC,choiceD,choiceE)){
		alert("please complete the question");
		return;
	}
	
	// if update Question succeeded 
	if(updateQuestion(paticipationQuestion,choiceA,choiceB,choiceC,choiceD,choiceE))
	{
		alert("Question Updated!");
		$("#teacherQuestion").show();
		$("#updatePaticipationQuestion").hide();
		loadQuestion();
	}
} 

/////////////////////////////////////////////////////////////////////////////
//   Function   :	isQuestionAvailable
//
//   Description:	determine the input question and choices are available or not
//
//   Arguments  :	strQ - question 
//					strA - choice A 
//					strB - choice B 
//					strC - choice C
//					strD - choice D 
//					strE - choice E
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function isQuestionAvailable(strQ, strA, strB, strC, strD, strE) {
	
	// if the question or choices are blank
	if(strQ == "" || strA == ""  || strB == ""  || strC == ""  || strD == ""  || strE == ""){
		return false;
	}else
		return true;
} 


/////////////////////////////////////////////////////////////////////////////
//   Function   :	updateQuestion
//
//   Description:	update the Question and choices to back-end json
//
//   Arguments  :	strQ - question 
//					strA - choice A 
//					strB - choice B 
//					strC - choice C
//					strD - choice D 
//					strE - choice E
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function updateQuestion(strQ, strA, strB, strC, strD, strE) {
	
	// POST and update to back-end
	paticipation_jsonParser.updateQuestion(strQ, strA, strB, strC, strD, strE);
	return true;
} 