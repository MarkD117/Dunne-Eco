from django.urls import path
from .views import test_s3_storage

urlpatterns = [
    path('test-s3/', test_s3_storage, name='test-s3'),
]
