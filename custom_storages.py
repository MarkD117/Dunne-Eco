from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage

class StaticStorage(S3Boto3Storage):
    location = settings.STATICFILES_LOCATION

    def __init__(self, *args, **kwargs):
        print("Using StaticStorage backend")
        super().__init__(*args, **kwargs)

class MediaStorage(S3Boto3Storage):
    location = settings.MEDIAFILES_LOCATION

    def __init__(self, *args, **kwargs):
        print("Using MediaStorage backend")
        super().__init__(*args, **kwargs)

