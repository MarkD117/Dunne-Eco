from django.urls import path
from . import views

app_name = 'gallery'

urlpatterns = [
    path('', views.gallery, name='gallery'),
    path('category/<slug:slug>/', views.category_detail, name='category_detail'),
]
