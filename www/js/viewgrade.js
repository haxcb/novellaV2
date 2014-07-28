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

var paticipationGrade = null;
var attendeceGrade = null;
var quizGrade = null;
var examGrade = null;
var totalGrade = null;


// ======================== METHOD START ====================================
/////////////////////////////////////////////////////////////////////////////
//   Function   :	showStudentGrade
//
//   Description:	show Student Grade List
//
//   Arguments  :	String - flag 
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function showStudentGrade(flag) {
	// reference and update the DOM
	$('#grade_nov_frame').show();
	$("#studentGradeList").empty();
	
	// update grade data
	calculateGrade();
	
	// condition: flag
    if (flag == "att") {
        createAttendenceGradeList();
    } else if (flag == "pati")  {
        createParticipateGradeList();
    } else if (flag == "quiz")  {
        createQuizGradeList();
    } else if (flag == "exam")  {
        createUavailableGradeList();
    } else if (flag == "total")  {
        createUavailableGradeList();
    }
	
	// refresh the listview
    $('#studentGradeList').listview('refresh');
}

/////////////////////////////////////////////////////////////////////////////
//   Function   :	createUavailableGradeList
//
//   Description:	show and update grade List
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function createUavailableGradeList() {
    // reference to DOM
    var attendenceOl = document.getElementById("studentGradeList");
    var temp = attendenceOl.childNodes;
	
	// create HTML element
	var obj = document.createElement("li");
	obj.innerHTML = "<h4 style='text-align:right'>Grade Uavailable</h4>";
	attendenceOl.appendChild(obj);
}

/////////////////////////////////////////////////////////////////////////////
//   Function   :	createAttendenceGradeList
//
//   Description:	show and update attendance grade List
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function createAttendenceGradeList() {
    // reference to DOM
    var attendenceOl = document.getElementById("studentGradeList");
    var temp = attendenceOl.childNodes;
    
	// dynamic create HTML listview
    var listLength = temp.length;
    var attendenceList = attendece_jsonParser.jsonData.attendence;
    for (var i = listLength; i < attendenceList.length; i++) {
        var obj = document.createElement("li");
        var cur_attendence = attendenceList[i].time;
		var html = "<span>Date: </span> <a href=>" + cur_attendence + " </a><span class ='notificationLeftSide'>checked-in</span>"; 
        obj.innerHTML = html;
        attendenceOl.appendChild(obj);
    }
	
	// create HTML element
	var obj = document.createElement("li");
	obj.innerHTML = "<h4 style='text-align:right'>Attendance Grade: "+attendeceGrade+"  </h4>";
	attendenceOl.appendChild(obj);
}

/////////////////////////////////////////////////////////////////////////////
//   Function   :	createParticipateGradeList
//
//   Description:	show and update participation grade List
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function createParticipateGradeList() {
    // reference to DOM
    var paticipationOl = document.getElementById("studentGradeList");
    var temp = paticipationOl.childNodes;
	
    // dynamic create HTML listview
    var listLength = temp.length;
    var paticipationList = paticipation_jsonParser.jsonData.Participate;
    for (var i = listLength; i < paticipationList.length; i++) {
        var obj = document.createElement("li");
        var cur_attendence = paticipationList[i].time;
		var html = "<span>Date: </span> <a href=>" + cur_attendence + " </a><span class ='notificationLeftSide'>checked-in</span>"; 
        obj.innerHTML = html;
        paticipationOl.appendChild(obj);
    }
	
	// create HTML element
	var obj = document.createElement("li");
	obj.innerHTML = "<h4 style='text-align:right'>Participation Grade: "+paticipationGrade+" </h4>";
	paticipationOl.appendChild(obj);
}

/////////////////////////////////////////////////////////////////////////////
//   Function   :	createQuizGradeList
//
//   Description:	show and update quiz grade List
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function createQuizGradeList() {
    // reference to DOM
    var quizOl = document.getElementById("studentGradeList");
    var temp = quizOl.childNodes;
	
    // dynamic create HTML listview
    var listLength = temp.length;
    var quizGradeList = quizGrade_jsonParser.jsonData.quiz;
    for (var i = listLength; i < quizGradeList.length; i++) {
        var obj = document.createElement("li");
        var cur_quizGrade = quizGradeList[i].grade;
		var html = "<span>Quiz: " + i + "</span> <a href=>" + cur_quizGrade + " </a><span class ='notificationLeftSide'>checked-in</span>"; 
        obj.innerHTML = html;
        quizOl.appendChild(obj);
    }
	
	// create HTML element
	var obj = document.createElement("li");
	obj.innerHTML = "<h4 style='text-align:right'>Quiz Grade: "+quizGrade+" </h4>";
	quizOl.appendChild(obj);
}

/////////////////////////////////////////////////////////////////////////////
//   Function   :	calculateGrade
//
//   Description:	calculate Grades
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function calculateGrade() {
	quizGrade = 0;
	paticipationGrade = 0;
	attendeceGrade = 0;
	// get raw data from json
	var participationCount = paticipation_jsonParser.jsonData.Participate.length;
    var attendenceCount = attendece_jsonParser.jsonData.attendence.length;
	var quizGradeList = quizGrade_jsonParser.jsonData.quiz;
	
	// init 
	var totalAttendance = 10;
	var totalPaticipation = 8;
	var totalQuiz = 10;
	var percentage = 5;
	
	// calculate and update grades
	paticipationGrade = (participationCount/totalPaticipation * percentage);
	attendeceGrade = (attendenceCount/totalAttendance * percentage);	
	for(var i=0; i<quizGradeList.length; i++){
		quizGrade += Number(quizGradeList[i].grade);
	}
}



