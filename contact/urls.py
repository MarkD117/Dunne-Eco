from django.urls import path
from . import views

urlpatterns = [
    path('contact-form/', views.contact, name='contact-form'),
    path('customer-email-preview/', views.preview_confirmation_email, name='customer-email-preview'),
    path('owner-email-preview/', views.preview_owner_email, name='owner-email-preview'),
]