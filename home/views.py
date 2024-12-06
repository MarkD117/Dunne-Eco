from django.shortcuts import render
from django.contrib import messages


def index(request):
    """ This view returns the index page """
    return render(request, 'home/index.html')
    