from django.urls import path
from . import views

urlpatterns = [
    path('', views.doors, name='doors'),
    path('doors/unavailable/', views.unavailable_message, name='unavailable_message'),
]
