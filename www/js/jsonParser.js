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
var g_httpGet = createRequestObject();
var g_httpPost = createRequestObject();

var attendece_jsonParser = new attendeceParser();
var paticipation_jsonParser = new paticipationParser();
var quiz_jsonParser = new quizParser();
var quizGrade_jsonParser = new quizParser();

// init json data
// comment: current the json data is static, save in "www/js/json"
/*
var path_attendece = "http://yaduo.netii.net/json/attendance.json";
var path_paticipation = "http://yaduo.netii.net/json/paticipation.json";
var path_quiz="http://yaduo.netii.net/json/quiz.json";
*/

var path_attendece = "js/json/test.json";
var path_paticipation = "js/json/paticipation.json";
var path_quiz="js/json/quiz.json";
var path_quizGrade="js/json/quizGrade.json";

attendece_jsonParser.init(path_attendece);
paticipation_jsonParser.init(path_paticipation);
quiz_jsonParser.init(path_quiz);
quizGrade_jsonParser.init(path_quizGrade);

//================================ http request ===================================

/////////////////////////////////////////////////////////////////////////////
//   Function   :	createRequestObject
//
//   Description:	Creates the appropriate ajax request object
//
//   Arguments  :	none
//
//   Returns:   :	request object
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function createRequestObject()
{
	var request_o;
	var browser = navigator.appName;

	if (browser == "Microsoft Internet Explorer")
	{
		/* Create the object using MSIE's method */
		request_o = new ActiveXObject("Microsoft.XMLHTTP");
		try
		{
			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
			user_pref("signed.applets.codebase_principal_support", true);
		}
		catch (e) { }
	}
	else
	{
		/* Create the object using other browser's method */
		request_o = new XMLHttpRequest();
	}
	return request_o; //return the object
}


//================================ JSON parser basic ===================================

/////////////////////////////////////////////////////////////////////////////
//   Function   :	jsonParser
//
//   Description:	basic class for json parser
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function jsonParser() {

    // record the json data
    this.jsonData;

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	jsonParser.init
    //
    //   Description:	Loads the proper string table based on the browser reported language
    //
    //   Arguments  :	none
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    /////////////////////////////////////////////////////////////////////////////
    this.init = function (path) {
       // alert("hahaha");
        var script = document.createElement('script');
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);	

        // http request "GET": get JSON
        this.downloadJson(path);
    }

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	jsonParser.downloadJson
    //
    //   Description:	Loads the json data from back end
    //
    //   Arguments  :	url: path
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    /////////////////////////////////////////////////////////////////////////////
    this.downloadJson = function (path) {
        var temp = this;
        g_httpGet.open("GET", path, false);
        g_httpGet.onreadystatechange = function () {
            if (g_httpGet.readyState == 4) {
                try {
                    temp.jsonData = jQuery.parseJSON(g_httpGet.responseText);
                } catch (e) {
                    console.log('String Helper Init Failed: ' + e);
                }
            }
        }
        g_httpGet.send(null);

        this.jsonData = temp.jsonData;
    }

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	jsonParser.uploadJson
    //
    //   Description:	up Loading the json data to back end
    //
    //   Arguments  :	url: path
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    /////////////////////////////////////////////////////////////////////////////
    this.uploadJson = function (path) {
        alert("upload");
        /*
        g_httpPost.open("POST", path, true);
        g_httpPost.onreadystatechange = updatePage;
        g_httpPost.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        g_httpPost.send(g_jsonParser.jsonData);
        */
    }

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	jsonParser.loadString
    //
    //   Description:	Dynamically updates specific strings when called
    //
    //   Arguments  :	strId - The id of the string to be used
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    /////////////////////////////////////////////////////////////////////////////
    this.loadString = function (strId)
    {
        var string = "";
        try
        {
            string = eval('this.jsonData.' + strId);
        }
        catch (e)
        {
            string = strId;
        }

        return string;
    }
}


//================================ attendece JSON parser ===================================

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	attendeceParser
//
//   Description:	inherit jsonParser
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function attendeceParser() {

    // inherit jsonParser
    this.temp = jsonParser;
    this.temp();
    delete this.temp;

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	updateAttendceCode
    //
    //   Description:	record radom attendence code into json data
    //
    //   Arguments  :	none
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    ///////////////////////////////////////////////////////////////////////////// 
    this.updateAttendceCode = function (passcode) {
       // alert("updateAttendceCode: " + passcode);
        this.jsonData.attendenceCode = passcode;
    }

	/////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	jsonParser.addAttendence
    //
    //   Description:	update the attendance
    //
    //   Arguments  :	none
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    /////////////////////////////////////////////////////////////////////////////
    this.addAttendence = function () {
		// init the time stamp
        var myDate = new Date();
        var timeStemp = myDate.toLocaleString();
        var temp = { time: timeStemp };
		// push json data
        this.jsonData.attendence.push(temp);
    }
}

//================================ paticipation JSON parser ===================================

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	stringHelper.loadString
//
//   Description:	Dynamically updates specific strings when called
//
//   Arguments  :	strId - The id of the string to be used
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function paticipationParser() {

    // inherit jsonParser
    this.temp = jsonParser;
    this.temp();
    delete this.temp;

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	addPaticipation
    //
    //   Description:	update the Participation
    //
    //   Arguments  :	none
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    ///////////////////////////////////////////////////////////////////////////// 
    this.addPaticipation = function () {
        // init the time stamp
		var myDate = new Date();
        var timeStemp = myDate.toLocaleString();
        var temp = { time: timeStemp };
		// push json data
        this.jsonData.Participate.push(temp);
    }

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	updateQuestion
    //
    //   Description:	record radom attendence code into json data
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
    this.updateQuestion = function (strQ, strA, strB, strC, strD, strE) {
        this.jsonData.question = strQ;
		this.jsonData.item.a = strA;
		this.jsonData.item.b = strB;
		this.jsonData.item.c = strC;
		this.jsonData.item.d = strD;
		this.jsonData.item.e = strE;
    }
}


//================================ quiz JSON parser ===================================

/////////////////////////////////////////////////////////////////////////////
//
//   Function   :	attendeceParser
//
//   Description:	inherit jsonParser
//
//   Arguments  :	none
//
//   Returns:   :	none
//
//   Comments   :	none
//
/////////////////////////////////////////////////////////////////////////////
function quizParser() {

    // inherit jsonParser
    this.temp = jsonParser;
    this.temp();
    delete this.temp;

    /////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	updateAttendceCode
    //
    //   Description:	record radom attendence code into json data
    //
    //   Arguments  :	none
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    ///////////////////////////////////////////////////////////////////////////// 
    this.updateAttendceCode = function (passcode) {
       // alert("updateAttendceCode: " + passcode);
        //this.jsonData.attendenceCode = passcode;
    }

	/////////////////////////////////////////////////////////////////////////////
    //
    //   Function   :	jsonParser.addAttendence
    //
    //   Description:	update the attendance
    //
    //   Arguments  :	none
    //
    //   Returns:   :	none
    //
    //   Comments   :	none
    //
    /////////////////////////////////////////////////////////////////////////////
    this.addQuiz = function () {
		// init the time stamp
        //var myDate = new Date();
        //var timeStemp = myDate.toLocaleString();
        //var temp = { time: timeStemp };
		// push json data
        //this.jsonData.attendence.push(temp);
    }
}

