from django.urls import path
from first_app import views

urlpatterns = [
    path("", views.index, name='index'),
    path("two/", views.two, name='two'),
]