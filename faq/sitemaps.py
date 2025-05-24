from django.contrib.sitemaps import Sitemap
from .models import Category

class FAQCategorySitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.8

    def items(self):
        return Category.objects.all()

    def lastmod(self, obj):
        latest_faq = obj.faqs.order_by('-created_at').first()
        return latest_faq.created_at if latest_faq else None
