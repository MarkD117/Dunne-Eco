from django.core.paginator import Paginator
from django.shortcuts import render
from django.db.models import Q
from .models import FAQ, Category
from django.shortcuts import get_object_or_404


def faq_list(request):
    """ This view handles showing all the categories and questions """
    query = request.GET.get('q')
    selected_category = request.GET.get('category')

    faqs = FAQ.objects.filter(published=True)

    # Filter by category slug
    if selected_category:
        faqs = faqs.filter(category__slug=selected_category)

    # Filter by search query
    if query and query.lower() != "none":
        faqs = faqs.filter(
            Q(question__icontains=query) | Q(answer__icontains=query)
        )
    else:
        query = ""  # clean up 'None' string from query param

    paginator = Paginator(faqs, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    categories = Category.objects.all()

    context = {
        'page_obj': page_obj,
        'categories': categories,
        'selected_category': selected_category,
        'query': query,
    }
    return render(request, 'faq/faq_list.html', context)

def category_detail(request, slug):
    """ This view handles specific category pages for SEO friendly urls """
    category = get_object_or_404(Category, slug=slug)
    query = request.GET.get('q')

    faqs = FAQ.objects.filter(published=True, category=category)

    if query and query.lower() != "none":
        faqs = faqs.filter(
            Q(question__icontains=query) | Q(answer__icontains=query)
        )
    else:
        query = ""

    paginator = Paginator(faqs, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    categories = Category.objects.all()

    context = {
        'category': category,
        'categories': categories,
        'page_obj': page_obj,
        'query': query,
    }
    return render(request, 'faq/faq_list.html', context)
