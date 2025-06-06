from django.db import models
from django.utils.text import slugify
from django.urls import reverse


class Category(models.Model):
    name = models.CharField(max_length=254, unique=True)
    slug = models.SlugField(max_length=254, unique=True, blank=True)

    def save(self, *args, **kwargs):
        # Generate slug from name if it is not set
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'
    
    def get_absolute_url(self):
        return reverse('gallery:category_detail', args=[self.slug])


class Image(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE, null=False,
        blank=False, related_name="images"
    )
    image = models.ImageField(upload_to="gallery/", null=False, blank=False)
    title = models.CharField(max_length=254, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"Image {self.id}"

    class Meta:
        ordering = ['-uploaded_at']
