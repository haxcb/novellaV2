from django.conf.urls import patterns, include, url
from tastypie.api import Api
from course.resources import CourseResource

from django.contrib import admin
admin.autodiscover()


course_resource = CourseResource()


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'novella.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^lms/', include('lms.urls')),
    url(r'^courses/', include('course.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^quizes/', include('quiz.urls')),
    url(r'^api/', include(course_resource.urls)),
)
