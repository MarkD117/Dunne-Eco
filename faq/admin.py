from django.contrib import admin
from .models import FAQ, Category
from django_summernote.admin import SummernoteModelAdmin


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(FAQ)
class FAQAdmin(SummernoteModelAdmin):
    list_display = ('question', 'category', 'is_active', 'created_at')
    list_filter = ('is_active', 'category')
    search_fields = ('question', 'answer')
    summernote_fields = ('answer')
