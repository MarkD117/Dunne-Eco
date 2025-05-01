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

    categories = Category.objects.all()

    context = {
        'faqs': faqs,
        'categories': categories,
        'selected_category': category_id,
        'query': query,
    }
    return render(request, 'faq/faq_list.html', context)
