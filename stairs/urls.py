from django.urls import path
from . import views

urlpatterns = [
    path('', views.door_builders, name='stairs'),
]
