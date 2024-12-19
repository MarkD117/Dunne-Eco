from django.shortcuts import render
from .models import Brochure


def downloads_list(request):
    brochures = Brochure.objects.all()
    return render(request, 'downloads/downloads_list.html', {'brochures': brochures})