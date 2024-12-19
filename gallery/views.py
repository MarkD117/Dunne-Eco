from django.shortcuts import render
from .models import Category, Image


def gallery(request):
    categories = Category.objects.all()
    images = Image.objects.all()
    context = {
        'categories': categories,
        'images': images,
    }
    return render(request, 'gallery/gallery.html', context)