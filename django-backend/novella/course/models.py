from django.db import models
from lms.models import User
from django.contrib.auth.models import Group

# Create your models here.

class Course(models.Model):
	courseCode = models.CharField(max_length=25,default="No code yet")
	title = models.TextField(blank=True)

	def __unicode__(self):
		return self.courseCode
	
class Section(models.Model):
	course = models.ForeignKey(Course, related_name="section_course")
	instructor = models.ForeignKey(User, related_name="instructor", limit_choices_to= {'is_staff': True})
	sectionCode = models.CharField(max_length=25,default="No code yet")
	start = models.DateField(null=True, blank=True)
	end = models.DateField(null=True, blank=True)



	def __unicode__(self):
		return (self.course.courseCode + ">" + self.sectionCode)

class Lecture(models.Model):
	course = models.ForeignKey(Section, related_name="lecture_section")
	lectureCode = models.CharField(max_length=25,default="No code yet")
	weekNumber = models.IntegerField(default=0)

	def __unicode__(self):
		return (self.course.sectionCode + ">" + self.lectureCode)

class Content(models.Model):
	lecture = models.ForeignKey(Lecture, related_name="content_lecture")
	contentCode = models.CharField(max_length=25,default="No code yet")
	title = models.TextField(blank=True)
	body = models.TextField(blank=True)

	def __unicode__(self):
		return (self.course.sectionCode + ">" + self.lectureCode + ">" + self.contentCode)

class Assignment(models.Model):
	course = models.ForeignKey(Section, related_name="assignment_section")
	assignmentCode = models.CharField(max_length=25,default="No code yet")
	postedDate = models.DateTimeField(auto_now_add=True)
	dueDate = models.DateTimeField(blank=True)
	title = models.TextField(blank=True)
	body = models.TextField(blank=True)
	mainFile = models.FileField(upload_to ='assignments' ,blank=True)
	markingFile = models.FileField(upload_to ='marking',blank=True)
	maxGrade = models.IntegerField(default=0)
	weight = models.IntegerField(default=0)
	status = models.CharField(max_length=25,default="active")

	def __unicode__(self):
		return (self.course.course.courseCode + ">" + self.course.sectionCode + ">" + self.assignmentCode)

class Notification(models.Model):
	course = models.ForeignKey(Section, related_name="notification_section")
	noticeCode = models.CharField(max_length=25,default="No code yet")
	content = models.TextField(blank=True)

	def __unicode__(self):
		return (self.course.course.courseCode + ">" + self.course.sectionCode + ">" + str(self.id))
