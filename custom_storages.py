from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
import logging
logger = logging.getLogger(__name__)

class StaticStorage(S3Boto3Storage):
    location = settings.STATICFILES_LOCATION
    logger.info(f"Static file location: {location}")

class MediaStorage(S3Boto3Storage):
    location = settings.MEDIAFILES_LOCATION
    logger.info(f"Media file location: {location}")
