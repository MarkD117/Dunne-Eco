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
        return reverse('faq:category_detail', kwargs={'slug': self.slug})


class FAQ(models.Model):
    category = models.ForeignKey(
            Category,
            on_delete=models.CASCADE,
            related_name='faqs'
        )
    question = models.CharField(max_length=255)
    answer = models.TextField()
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.question
