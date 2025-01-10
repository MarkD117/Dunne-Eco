from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
import logging
logger = logging.getLogger('storages')

class StaticStorage(S3Boto3Storage):
    location = settings.STATICFILES_LOCATION
    def __init__(self, *args, **kwargs):
        logger.debug(f"Initializing StaticStorage with location: {self.location}")
        super().__init__(*args, **kwargs)

class MediaStorage(S3Boto3Storage):
    location = settings.MEDIAFILES_LOCATION
