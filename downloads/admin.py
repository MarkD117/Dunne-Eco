from django.contrib import admin
from .models import Brochure


@admin.register(Brochure)
class BrochureAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')
    fields = ('title', 'description', 'brochure_file', 'thumbnail')
    search_fields = ('title',)
