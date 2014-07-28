from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie.serializers import Serializer
from lms.models import UserProfile, Enrollment
from course.models import Section
from course.api import SectionResource

class UserResource(ModelResource):


	class Meta:
		queryset = UserProfile.objects.all()
		resource_name = 'user'
		


class EnrollmentResource(ModelResource):
	section = fields.ForeignKey(SectionResource, 'course', full=True)
	user = fields.ForeignKey(UserResource, 'student', full=True)

	class Meta:
		queryset = Enrollment.objects.all()
		resource_name = 'enrollment'
		filtering = {
			"user":ALL_WITH_RELATIONS,
			"section":ALL_WITH_RELATIONS

		}

