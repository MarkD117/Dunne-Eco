from django.shortcuts import render
from .models import Category, Image


def gallery(request):
    categories = Category.objects.all()
    selected_category = request.GET.get('category')
    images = Image.objects.all()

    # Only filter images if a category is selected
    if selected_category:
        images = images.filter(category__slug=selected_category)

    context = {
        'categories': categories,
        'selected_category': selected_category,
        'images': images,
    }
    return render(request, 'gallery/gallery.html', context)
