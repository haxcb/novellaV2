from tastypie.resources import ModelResource
from course.models import Course

class CourseResource(ModelResource):
	class Meta:
		queryset = Course.objects.all()
		resource_name = 'courses'
		allowed_methods = ['get', 'post', 'put', 'delete', 'patch']