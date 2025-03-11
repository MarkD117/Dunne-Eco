from django.shortcuts import render
from .models import Brochure
from .forms import BrochureForm


def downloads_list(request):
    brochures = Brochure.objects.all()
    context = {'brochures': brochures}
    return render(request, 'downloads/downloads_list.html', context)
