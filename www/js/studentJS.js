// --------------------------AJAX CALL: Load JSON file -------------------- //
// ------------------------------------------------------------------------ //
//Use AJAX call to retrieve JSON file from Remote Server
var info = (function () {
    var info = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://127.0.0.1:8000/lms/quizes/api/quiz/?format=json",
        'dataType': "json",
        'success': function (data) {
            info = data.objects;
        }
    });
    return info;
})(); 
// --------------------------AJAX CALL: End-------------------------------- //
// ------------------------------------------------------------------------ //



// --------------------------First Page: Page Init------------------------- //
// ------------------------------------------------------------------------ //
//pageinit event for first page
//triggers only once
//write all your on-load functions and event handlers pertaining to page1
var id = 0;
$(document).on("pageinit", "#quizList-page", function () {
	console.log("Info gets loaded: ",info.length);
    var li = "";
    //container for $li to be added
    $.each(info, function (i, quiz) {
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
        li += '<li><a href="#" id="' + i + '" class="info-go">' + quiz.quizName + '</a></li>'; //quiz.quizName
    });
	
	for (var key = 0; key < info.length; key++){
		
		info[key]["flag"] = 0;
	}
	
    //append list to ul
    $("#prof-list").append(li).promise().done(function () {
        //wait for append to finish - that's why you use a promise()
        //done() will run after append is done
        //add the click event for the redirection to happen to #Question-page
        $(this).on("click", ".info-go", function (e) {
            e.preventDefault();
			id = this.id;
			console.log("current id is: "+id);
            //store the information in the next page's data
			if (info[this.id]["flag"] == 0){
				$("#ready-page").data("info", info[this.id]);
				$("#Question-page").data("info", info[this.id]);				
				$("#Grading-page").data("info", info[this.id]);
				$.mobile.changePage("#ready-page");            
			}
			else{
				$("#Grading-page").data("info", info[this.id]);				
				$.mobile.changePage("#Grading-page");
			}	
            //change the page # to second page. 
            //Now the URL in the address bar will read index.html#ready-page
            //where #ready-page is the "id" of the second page
            //we're gonna redirect to that now using changePage() method
            
        });

        //refresh list to enhance its styling.
        $(this).listview("refresh");
    });
});
// --------------------------First Page: End ------------------------------ //
// ------------------------------------------------------------------------ //





// --------------------------Second Page: Ready Page ---------------------- //
// ------------------------------------------------------------------------ //
//use pagebeforeshow
//DONT USE PAGEINIT! 
//the reason is you want this to happen every single time
//pageinit will happen only once

// Ready Page Variables
var index = 0;	// mark the current question number
var info_view = new Array();

// initial question array, answer array, correct answer array, and response array to store loaded data
var ques = new Array();
var ans = new Array();
var corrAns = new Array();

$(document).on("pagebeforeshow", "#ready-page", function () {	
		ques = [];
		ans = [];		
	    index = 0;
	    //add this to html
		document.getElementById("ready-content").innerHTML = info[id]["introduction"];
});
// --------------------------Second Page: End ----------------------------- //
// ------------------------------------------------------------------------ //




// --------------------------Third Page: Question Page -------------------- //
// ------------------------------------------------------------------------ //
$(document).on("pagebeforeshow", "#Question-page", function () {
// set a timer for the quiz
	var	time = info[id]["timeLimit"]*60;
	var myVar = setInterval(function(){myTimer()}, 1000);

	function myTimer() {
		time--;
		var showTime = Math.floor(time/60).toString() + " minutes " + (time%60).toString() + " seconds ";
		$("#timer").html(showTime);
		if (time == 0){
			alert("time's up!");
			$("#submit").trigger('click');
			clearInterval(myVar);	//timer stops
		}
	}
	
	$(this).find($("#Questions")).html(info[id]["questions"][index]["text"]);

	$(this).find($("#ANS1")).html(info[id]["questions"][index]["choiceA"]);
	$(this).find($("#ANS2")).html(info[id]["questions"][index]["choiceB"]);
	$(this).find($("#ANS3")).html(info[id]["questions"][index]["choiceC"]);
	$(this).find($("#ANS4")).html(info[id]["questions"][index]["choiceD"]);
	
	loadAns();
	var newarr = new Array(2);
	console.log(newarr[0]);
	
	function loadAns(){	
		// Method 2 - if there are many choices and we did not set the initial value
		console.log(info[id]["questions"][index]["response"]);
		document.getElementById("currQues").innerHTML = (index+1).toString()+"/"+info[id]["questions"].length.toString();
		if (info[id]["questions"][index]["response"] != null) 
		{
			var st = "#ans" + (info[id]["questions"][index]["response"].charCodeAt(0) - 64).toString();
			console.log(st);
			for (var i = 1; i < 5; i++) {
				if(i == info[id]["questions"][index]["response"].charCodeAt(0) - 64)
				{
					$(st).prop("checked", true).checkboxradio("refresh");
				}
				else
				{
					var ot = "#ans" + i.toString();
					$(ot).prop("checked", false).checkboxradio("refresh");
				}
			}
		}
		else
		{
			$("#ans1").prop("checked", false).checkboxradio("refresh");
			$("#ans2").prop("checked", false).checkboxradio("refresh");
			$("#ans3").prop("checked", false).checkboxradio("refresh");
			$("#ans4").prop("checked", false).checkboxradio("refresh");			
		}
	}

	$("#next").click(function(){
		info[id]["questions"][index]["response"] = $('input[name=ans]:checked', '#radioForm').val();
		console.log(info[0]);
		
		if (index < info[id]["questions"].length-1) {
			index ++;

			$("#Questions").html(info[id]["questions"][index]["text"]);
			$("#ANS1").html(info[id]["questions"][index]["choiceA"]);
			$("#ANS2").html(info[id]["questions"][index]["choiceB"]);
			$("#ANS3").html(info[id]["questions"][index]["choiceC"]);
			$("#ANS4").html(info[id]["questions"][index]["choiceD"]);

			// load answer
			loadAns();
		}
	});

	$("#prev").click(function(){
		info[id]["questions"][index]["response"] = $('input[name=ans]:checked', '#radioForm').val();
		console.log(info[0]);
		
		if (index >= 1) {
			index --;
			$("#Questions").html(info[id]["questions"][index]["text"]);
			$("#ANS1").html(info[id]["questions"][index]["choiceA"]);
			$("#ANS2").html(info[id]["questions"][index]["choiceB"]);
			$("#ANS3").html(info[id]["questions"][index]["choiceC"]);
			$("#ANS4").html(info[id]["questions"][index]["choiceD"]);

			loadAns();
		}
	});

	// submit answers and stop timer to go into grading part
	$("#submit").click(function(){
		
		info[id]["questions"][index]["response"] = $('input[name=ans]:checked', '#radioForm').val();	
		
		clearInterval(myVar);
		$.mobile.changePage("#Grading-page")
	});
});
// --------------------------Third Page: End ------------------------------ //
// ------------------------------------------------------------------------ //





// ------------------Fourth and Last Page: Grade Page --------------------- //
// ------------------------------------------------------------------------ //
$(document).on("pagebeforeshow", "#Grading-page", function(){	
	document.getElementById("title_Grading").innerHTML = "You're done!";
	document.getElementById("showGrade").innerHTML = '<p>Your answers are successfully submitted!</p>';
	
	
	$("#grade").click(function(){
		var grade = 0;
		for (var x = 0; x < info[id]["questions"].length; x++){
			if (info[id]["questions"][x]["response"] == info[id]["questions"][x]["corrAns"]){
				grade += 1;
			}
		}

		var result = "";
		for(var x = 0; x < info[id]["questions"].length; x++){ 			
				result += "<p> Question "+ (x+1) + ": " + info[id]["questions"][x]["text"] +"</p>";
				result += "<p> A. "+ info[id]["questions"][x]["choiceA"] +"</p>";
				result += "<p> B. "+ info[id]["questions"][x]["choiceB"] +"</p>";
				result += "<p> C. "+ info[id]["questions"][x]["choiceC"] +"</p>";
				result += "<p> D. "+ info[id]["questions"][x]["choiceD"] +"</p>";

				console.log(info[id]["questions"][x]["response"]);
				if (info[id]["questions"][x]["response"] != null && info[id]["questions"][x]["response"] != "" ) {result += "<p> Your Answer: "+ info[id]["questions"][x]["response"] +"</p>";}
				else {result += "<p>You did not answer this quesiton. </p>";}
				result += "<p>Correct Answer: "+ info[id]["questions"][x]["corrAns"] + "</p>";
		}
		
		result += "<p>Your total grade: "+ grade +"<p>";
		
		document.getElementById("title_Grading").innerHTML = "Grade";
		document.getElementById("showGrade").innerHTML = result;
	});
	
	if (info[id]["flag"] == 1)
	{
		$("#grade").trigger("click");
	}	
	info[id]["flag"] = 1;
});
// ------------------Fourth and Last Page: End ---------------------------- //
// ------------------------------------------------------------------------ //
