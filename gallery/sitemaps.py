from django.contrib.sitemaps import Sitemap
from .models import Category

class GalleryCategorySitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.8

    def items(self):
        return Category.objects.all()

    def lastmod(self, obj):
        latest_image = obj.images.order_by('-uploaded_at').first()
        return latest_image.uploaded_at if latest_image else None
