from django.conf.urls import patterns, include, url
from tastypie.api import Api
from api import QuizResource, QuestionResource

from quiz import views
quiz_resource = QuizResource()

# v1_api = Api(api_name='v1')
# v1_api.register(QuizResource())
# v1_api.register(QuestionResource())

urlpatterns = patterns('',
	# url(r'^api/',include(v1_api.urls)),
	url(r'api/', include(quiz_resource.urls)),
	url(r'^post/$', views.index, name='index'),
)