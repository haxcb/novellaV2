
var cache_inputAttendenceCode = null;
var interval = 2 * 60 // 2 mins
var timer = null;
var accountType = null;

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
	attendece_jsonParser.updateAttendceCode(res);
} 

function startCountDown() {
	var attendanceCodeInput = document.getElementById('attendanceCodeOnput').value;
	if(attendanceCodeInput == "")
	{
		alert("please generate the attendence code first");
		return;
	}
	// set up timer
	timer = setInterval("countDown()", 1000); 
}

function countDown() {
	if (interval >= 0) {
		// disable generate code button
		$("#generateCodeBtn").attr("disabled", true);
		document.getElementById("generateCodeBtn").style.background = "grey";
		// count down
		minutes = Math.floor(interval / 60);
		seconds = Math.floor(interval % 60);
		msg = "finish in " + minutes + " minutes " + seconds + " seconds";
		document.getElementById("attendanceTimerInput").value = msg
		--interval;
	} else {
		// timer stop
		clearInterval(timer);
		$("#generateCodeBtn").attr("disabled", false);
		document.getElementById("generateCodeBtn").style.background = "white";
		alert("time's up!");  
	}   
}

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
		//$("#confirmAttCode").hide();
    }
	// enter a incorrect code
	else {
    	alert("please enter a valid passcode");
	}
}


