from django.db import models


class Brochure(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)  # Optional description
    brochure_file = models.FileField(upload_to='brochures/')
    thumbnail = models.ImageField(upload_to='brochure-thumbnails/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title