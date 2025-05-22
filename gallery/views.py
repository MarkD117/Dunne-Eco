from django.shortcuts import render
from .models import Category, Image
from django.shortcuts import get_object_or_404


def gallery(request):
    """ This view handles showing all the categories images """
    categories = Category.objects.all()
    category = None
    images = Image.objects.all()

    context = {
        'categories': categories,
        'category': category,
        'images': images,
    }
    return render(request, 'gallery/gallery.html', context)


def category_detail(request, slug):
    """ This view handles specific category pages for SEO friendly urls """
    category = get_object_or_404(Category, slug=slug)
    categories = Category.objects.all()
    images = Image.objects.filter(category=category)

    context = {
        'categories': categories,
        'category': category,
        'images': images,
    }
    return render(request, 'gallery/gallery.html', context)
