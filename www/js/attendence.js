////////////////////////////////////////////////////////////////////////////////
//
//  Copyright 2014 (C) Team2 Group I.  All rights reserved.
//
//  File Name: viewgrade.js
// 
//  Author: Team 1
//
//	bug: Unknown
//
//	version: 2.0
//
////////////////////////////////////////////////////////////////////////////////

var cache_inputAttendenceCode = null;
var interval = 2 * 60 // 2 mins
var timer = null;
var accountType = null;

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	generateMixed
//
//   Description:	Generate number and letter mixed code
//
//   Arguments  :	int n - n digits
//
//   Returns:   :	none
//
//   Comments   :	update the code to json file
//
/////////////////////////////////////////////////////////////////////////////
function generateMixed(n) {
    var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                    'U', 'V', 'W', 'X', 'Y', 'Z'];
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += jschars[id];
	}
	document.getElementById('attendanceCodeOnput').value = res;
	// update the code to json file
	attendece_jsonParser.updateAttendceCode(res);
	
	//var abcdef = quiz_jsonParser.jsonData;
	
	//alert(quiz_jsonParser.jsonData.objects[0].dueDate);
} 

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	startCountDown
//
//   Description:	Count Down 2 mins
//
//   Arguments  :	
//
//   Returns:   :	none
//
//   Comments   :	update the code to json file
//
/////////////////////////////////////////////////////////////////////////////
function startCountDown() {
	// init timer and reference DOM
	clearInterval(timer);
	var attendanceCodeInput = document.getElementById('attendanceCodeOnput').value;
	
	// condition: user didn't generate an attendance code
	if(attendanceCodeInput == "")
	{
		alert("please generate the attendence code first");
		return;
	}
	
	// set up timer
	timer = setInterval("countDown()", 1000); 
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	countDown
//
//   Description:	start the timer, Count Down 2 mins
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function countDown() {
	// timer running
	if (interval >= 0) {
		// disable generate code button
		$("#generateCodeBtn").attr("disabled", true);
		document.getElementById("generateCodeBtn").style.background = "grey";
		// count down
		minutes = Math.floor(interval / 60);
		seconds = Math.floor(interval % 60);
		msg = "finish in " + minutes + " minutes " + seconds + " seconds";
		document.getElementById("attendanceTimerInput").innerHTML = msg
		--interval;
	}
	// timer stop	
	else {	
		clearInterval(timer);
		$("#generateCodeBtn").attr("disabled", false);
		document.getElementById("generateCodeBtn").style.background = "white";
		alert("time's up!");  
	}   
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	attCheckIn
//
//   Description:	student check in 
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function attCheckIn() {
	// reference to DOM and get json
    var comfirm_passcode = document.getElementById('comfirm_passcode').value;
	var passcode = attendece_jsonParser.loadString("attendenceCode");

	// conditions: 
	// ald checked in
    if (cache_inputAttendenceCode == comfirm_passcode) {
    	alert("do not double check in");
    } 
	// no passcode enter
	else if (comfirm_passcode == "") {
    	alert("please entre the attendence code");
    } 
	// passcode not create
	else if (passcode == "false") {
    	alert("please generate the attendence code");
    }
	// good to take attendence
	else if (comfirm_passcode == passcode && cache_inputAttendenceCode != comfirm_passcode) {
    	alert("checked in");
    	cache_inputAttendenceCode = comfirm_passcode;
    	attendece_jsonParser.addAttendence();
		$("#checkedinListDiv").show();
		createAttendenceList();
		$('#attendanceCheckList').listview('refresh');
    }
	// enter a incorrect code
	else {
    	alert("please enter a valid passcode");
	}
}

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	attCheckIn
//
//   Description:	student check in 
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function createAttendenceList() {
    // reference to DOM
    var attendenceOl = document.getElementById("attendanceCheckList");
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
	obj.innerHTML = "<h4 style='text-align:right'>total check-in: "+attendenceList.length+"  </h4>";
	attendenceOl.appendChild(obj);
}
