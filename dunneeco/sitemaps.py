from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from gallery.sitemaps import GalleryCategorySitemap
from faq.sitemaps import FAQCategorySitemap

# --- Static Views: home, contact, etc. ---
class StaticViewSitemap(Sitemap):
    priority = 1.0
    changefreq = 'monthly'

    def items(self):
        return [
            'home',
            'privacy-policy',
            'contact-form',
            'downloads-list',
            'doors',
            'stairs',
            'windows',
            'history',
        ]

    def location(self, item):
        return reverse(item)
