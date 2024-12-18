from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=254, unique=True)
    friendly_name = models.CharField(max_length=254)

    def __str__(self):
        return self.name

    def get_friendly_name(self):
        return self.friendly_name

    class Meta:
        verbose_name_plural = 'Categories'

class Image(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False, related_name="images")
    image = models.ImageField(upload_to="gallery/", null=False, blank=False)
    title = models.CharField(max_length=254, blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Image {self.id}"
