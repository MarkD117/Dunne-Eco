from django.urls import path
from . import views

urlpatterns = [
    path('', views.downloads_list, name='downloads-list'),
]