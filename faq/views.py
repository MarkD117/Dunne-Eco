from django.core.paginator import Paginator
from django.shortcuts import render
from django.db.models import Q
from .models import FAQ, Category

def faq_list(request):
    query = request.GET.get('q')
    category_id = request.GET.get('category')

    faqs = FAQ.objects.filter(is_active=True)

    if category_id:
        faqs = faqs.filter(category__id=category_id)

    if query:
        faqs = faqs.filter(
            Q(question__icontains=query) | Q(answer__icontains=query)
        )

    paginator = Paginator(faqs, 5)  # Show 5 FAQs per page
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
