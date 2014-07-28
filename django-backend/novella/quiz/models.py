from django.db import models
from django.contrib.auth.models import User
# from lms.models import Student, Instructor, Enrollment
# from course.models import Section
import lms, course

# Create your models here.
class Quiz(models.Model):
	student = models.ForeignKey(lms.models.User, related_name='quiz_student')
	course = models.ForeignKey(course.models.Section,related_name = 'quiz_coursesection') 
	name = models.CharField(max_length=200)
	# introduction = models.TextField(max_length=800)
	timeLimit = models.IntegerField(default=5)
	dueDate = models.DateField()
	timeDue = models.TimeField()
	# grade = models.FloatField(default=0)

	def __unicode__(self):
		return self.name


class Question(models.Model):
	quiz = models.ForeignKey('Quiz', related_name = 'questions')
	value = models.TextField(max_length=800)
	choiceA = models.CharField(max_length=200)
	choiceB = models.CharField(max_length=200)
	choiceC = models.CharField(max_length=200, blank=True)
	choiceD = models.CharField(max_length=200, blank=True)
	answer = models.CharField(max_length=50)
	# response = models.CharField(max_length=50, default=None, blank=True)

	def __unicode__(self):
		return self.value

# class Choice(models.Model):
# 	question = models.OneToOneField('Question', related_name = 'question_choice')
# 	choiceA = models.CharField(max_length=200)
# 	choiceB = models.CharField(max_length=200)
# 	choiceC = models.CharField(max_length=200, blank=True)
# 	choiceD = models.CharField(max_length=200, blank=True)