from django.forms import widgets
from rest_framework import serializers
from quiz.models import Quiz

class QuizSerializer(serializers.Serializer):
	pk = serializers.Field()
	