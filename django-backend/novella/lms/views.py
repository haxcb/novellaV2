#views.py for the Novella LMS API
#Programmers: Affan, Sen, Ben, Dnahui, Ying
#
#
#


from django.shortcuts import render
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.middleware.csrf import _get_new_csrf_key as get_new_csrf_key 
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils import simplejson
from models import Pending
import json
from django.http import HttpResponse, HttpRequest
from django_decorators.decorators import json_response

# Create your views here.

# If we want to use a web-login, we can use this view
def loginview(request):
	c = {}
	c.update(csrf(request))
	return render_to_response('login.html', c)


# The main authentication function for a registered user, the success and fail redirects can be changed
# @csrf_exempt
def auth_and_login(request, onsuccess='/lms/', onfail='/lms/login/'):

	user = authenticate(username=request.GET['email'], password=request.GET['password'])
	#user = authenticate(username=request.POST.get('email'), password=request.POST.get('password'))
	if user is not None:
		login(request, user)
		data = {}
		data['is_staff'] = user.is_staff
		data['id'] = user.id
		data['firstName'] = user.first_name
		data['lastName'] = user.last_name
		
		return HttpResponse(json.dumps(data), content_type = "application/json")
	else:
		return HttpResponse(status=401)

def testlogin(request):
	req = request.GET
	text = req['email']

	
	return HttpResponse(text)
	



# View funciton for signing up a new user
@json_response
def sign_up_in(request):
	post = request.GET
	email = post['email']
	password = post['password']
	firstName = post['firstName']
	lastName = post['lastName']
	if not user_exists(email):
		user = create_user(username=email, email=email, password=password)
		user.first_name = firstName
		user.last_name = lastName
		
		user.save()
		approval = Pending()
		approval.user = user
		approval.approved = False
		approval.save()
		data = {}
		data['response'] = 'Your request has been submitted for approval by admin.'
		response = HttpResponse(json.dumps(data), content_type = "application/json")
		response.status_code = 201
		return response
	else:
		data = {}
		data['response'] = 'Error: User already exists'
		response = HttpResponse(json.dumps(data), content_type = "application/json")
		response.status_code = 403
		return response

# Create a new user with the request credentials
def create_user(username,email,password):
	user = User(username=username, email=email)
	user.set_password(password)
	user.save()
	return user

# Check to see if username exists or not
def user_exists(username):
	user_count = User.objects.filter(username=username).count()
	if user_count == 0:
		return False
	return True

def loginform(request):
	return render(request, 'lms/login.html')

# Dummy base view for /lms
def index(request):
	data = {}
	data['version'] = '1.0'
	data['title'] = 'Novella Learning Management System API'
	data['status'] = 200
	data['message'] = 'You have successfully logged in'
	data['next_url'] = "http://54.186.33.14/lms/loginform/"
	return HttpResponse(json.dumps(data), content_type = "application/json")

def logout_view(request):
	logout(request)
	data = {}
	data['response'] = 'Logged out'
	response = HttpResponse(json.dumps(data), content_type = "application/json")
	response.status_code = 204
	return response