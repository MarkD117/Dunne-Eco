from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage

class StaticStorage(S3Boto3Storage):
    # Set location using `STATICFILES_LOCATION` from settings, but default to 'static' if not defined
    location = getattr(settings, 'STATICFILES_LOCATION', 'static')

class MediaStorage(S3Boto3Storage):
    # Set location using `MEDIAFILES_LOCATION` from settings, but default to 'media' if not defined
    location = getattr(settings, 'MEDIAFILES_LOCATION', 'media')
