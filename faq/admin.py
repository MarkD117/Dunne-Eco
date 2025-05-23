from django.contrib import admin
from .models import FAQ, Category
from django_summernote.admin import SummernoteModelAdmin


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    # Slug read-only due to auto-generation
    readonly_fields = ('slug',)
    # Slug included as read-only in the form layout
    fields = ('name', 'slug')

    def save_model(self, request, obj, form, change):
        """
        Override save_model to ensure the slug is generated on save.
        """
        if not obj.slug:  # Only generate slug if it's not already set
            obj.slug = obj.save()
        super().save_model(request, obj, form, change)


@admin.register(FAQ)
class FAQAdmin(SummernoteModelAdmin):
    list_display = ('question', 'category', 'published', 'created_at')
    list_filter = ('published', 'category')
    search_fields = ('question', 'answer')
    summernote_fields = ('answer')
