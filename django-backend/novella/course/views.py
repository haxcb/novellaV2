from django.shortcuts import render
from models import Course, Section, Lecture, Content, Assignment, Notification



# Create your views here.


def createAssignment(request):
	post = request.GET
	email = post['email']
	password = post['password']
	firstName = post['firstName']
	lastName = post['lastName']
