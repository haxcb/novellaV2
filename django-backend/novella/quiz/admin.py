from django.contrib import admin
from quiz.models import Quiz, Question

# Register your models here.
class QuestionInline(admin.StackedInline):
	model = Question
	extra = 1

class QuizAdmin(admin.ModelAdmin):

	inlines = [QuestionInline]

admin.site.register(Quiz, QuizAdmin)