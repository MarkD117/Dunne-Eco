from django.urls import path
from . import views

urlpatterns = [
    path('', views.stairs, name='stairs'),
]
