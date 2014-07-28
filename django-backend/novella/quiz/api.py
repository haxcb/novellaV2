from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.resources import ALL
from tastypie.serializers import Serializer
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from quiz.models import Quiz, Question
# import urlparse

class QuestionResource(ModelResource):
	# quiz = fields.ForeignKey(QuizResource, 'quiz')

	class Meta:
		queryset = Question.objects.all()
		resource_name = 'question'
		list_allowed_methods = ['get', 'post','put']
		include_resource_uri = False
		excludes = ['id']
		serializer = Serializer(formats=['json'])
		authorization= Authorization()

class QuizResource(ModelResource):
	questions = fields.ToManyField('quiz.api.QuestionResource','questions',full=True)

	class Meta:
		queryset = Quiz.objects.all()
		list_allowed_methods = ['get', 'post','put']
		resource_name = 'quiz'
		# excludes = ['id']
		include_resource_uri = False
		serializer = Serializer(formats=['json'])
		authentication = Authentication()
		authorization = Authorization()
		always_return_data = True