from django.db import models
from django.utils.timezone import now


class Contact(models.Model):
    """Contact model used for collecting information from the conatact form"""
    name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(max_length=100, null=False, blank=False)
    phone = models.CharField(max_length=15, null=True, blank=True)
    subject = models.CharField(max_length=254, null=False, blank=False)
    message = models.TextField()
    created_at = models.DateTimeField(default=now, editable=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"
