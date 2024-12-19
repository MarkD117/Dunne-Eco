from django.db import models


class Brochure(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)  # Optional description
    brochure_file = models.FileField(upload_to='brochures/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title