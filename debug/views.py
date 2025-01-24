from django.http import JsonResponse
from django.conf import settings

def test_s3_storage(request):
    return JsonResponse({
        'STATICFILES_STORAGE': settings.STATICFILES_STORAGE,
        'AWS_STORAGE_BUCKET_NAME': settings.AWS_STORAGE_BUCKET_NAME,
    })
