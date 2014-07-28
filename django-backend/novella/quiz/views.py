from django.http import HttpResponse
from django.template import RequestContext, loader
from quiz.models import Quiz, Question
# from django.db import models
# from util 

def index(request):

	qName = request.GET['name']
	tLimit = request.GET['timeLimit'] 
	tLimit = tLimit.strip('"')
	tLimit = int(tLimit)
	dDate = request.GET['dueDate']
	dTime = request.GET['timeDue']
	# intro = request.GET['introduction']
	# g = request.GET['grade']

	newQuiz = Quiz(student_id=1, course_id=1, name=qName,  timeLimit=tLimit, dueDate=dDate, timeDue=dTime)
	newQuiz.save()

	for i in range(10):
		try:
			questionSet = request.GET['questions['+str(i)+'][choiceA]']
		except Exception:
			print "Question Set Error: Out of Bound"
		else:
			q_choiceA = request.GET['questions['+str(i)+'][choiceA]']
			q_choiceB = request.GET['questions['+str(i)+'][choiceB]']
			q_choiceC = request.GET['questions['+str(i)+'][choiceC]']
			q_choiceD = request.GET['questions['+str(i)+'][choiceD]']
			q_corrAns = request.GET['questions['+str(i)+'][answer]']
			q_text = request.GET['questions['+str(i)+'][value]']
			# q_response = request.GET['questions['+str(i)+'][response]']
			newQuiz.questions.create(choiceA=q_choiceA, choiceB=q_choiceB, choiceC=q_choiceC,choiceD=q_choiceD, answer=q_corrAns, value=q_text)
	

	# return HttpResponse(request.GET['questions[0][text]'])
	return HttpResponse('Success')
