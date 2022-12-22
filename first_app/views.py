from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponse
# Create your views here.


def index(request):
    my_dict = {'insert_me': "Hello from view.py"}
    return render(request, "index.html", context=my_dict)

def two(request):
    return HttpResponse("Two")
