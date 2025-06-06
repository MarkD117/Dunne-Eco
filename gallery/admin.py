from django.contrib import admin
from .models import Category, Image


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'uploaded_at')
    list_filter = ('category',)
    search_fields = ('title', 'category__name')
