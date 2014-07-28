#urls.py for the Novella LMS API
#Programmers: Affan, Danhui, Ying
#
#
#

from django.conf.urls import patterns, url, include
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

from lms import views

from django.conf.urls import patterns, include, url
from tastypie.api import Api
from api import UserResource, EnrollmentResource


v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(EnrollmentResource())


urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^login/$', csrf_exempt(views.auth_and_login), name='login'),
    #url(r'^register/$', csrf_exempt(views.testlogin), name='login'),
    url(r'^register/$', views.sign_up_in, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^loginform/$', views.loginform, name='weblogin'),

    
    url(r'api/', include(v1_api.urls)),
#    url(r'^students/', include(student_resource.urls)),

)