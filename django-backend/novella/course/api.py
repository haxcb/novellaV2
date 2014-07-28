from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.resources import ALL
from tastypie.serializers import Serializer
from course.models import Course, Section, Lecture, Content, Assignment, Notification
from lms.models import Enrollment, UserProfile

class UserResource(ModelResource):


	class Meta:
		queryset = UserProfile.objects.all()
		resource_name = 'user'



class CourseResource(ModelResource):


	class Meta:
		queryset = Course.objects.all()
		resource_name = 'course'



class SectionResource(ModelResource):
	course = fields.ForeignKey(CourseResource, 'course', full=True)

	class Meta:
		queryset = Section.objects.all()
		resource_name = 'section'

class LectureResource(ModelResource):
	section = fields.ForeignKey(SectionResource, 'course', full=True)

	class Meta:
		queryset = Lecture.objects.all()
		resource_name = 'lectures'


class ContentResource(ModelResource):
	lecture = fields.ForeignKey(LectureResource, 'lecture', full=True)

	class Meta:
		queryset = Content.objects.all()
		resource_name = 'contents'


class AssignmentResource(ModelResource):
	section = fields.ForeignKey(SectionResource, 'course', full=True)

	class Meta:
		queryset = Assignment.objects.all()
		resource_name = 'assignments'


class NotificationResource(ModelResource):
	section = fields.ForeignKey(SectionResource, 'course', full=True)

	class Meta:
		queryset = Notification.objects.all()
		resource_name = 'notifications'