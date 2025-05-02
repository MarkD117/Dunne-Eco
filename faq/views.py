from django.core.paginator import Paginator
from django.shortcuts import render
from django.db.models import Q
from .models import FAQ, Category

def faq_list(request):
    query = request.GET.get('q')
    category_id = request.GET.get('category')

    faqs = FAQ.objects.filter(is_active=True)

    # Safely filter by category only if it's a valid digit
    if category_id and category_id.isdigit():
        faqs = faqs.filter(category__id=category_id)
    else:
        category_id = None  # reset to avoid errors and keep context clean

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
        'selected_category': category_id,
        'query': query,
    }
    return render(request, 'faq/faq_list.html', context)

