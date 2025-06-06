from django.contrib import admin
from .models import FAQ, Category
from django_summernote.admin import SummernoteModelAdmin


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(FAQ)
class FAQAdmin(SummernoteModelAdmin):
    list_display = ('question', 'category', 'published', 'created_at')
    list_filter = ('published', 'category')
    search_fields = ('question', 'answer')
    summernote_fields = ('answer')
