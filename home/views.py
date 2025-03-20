from django.shortcuts import render
from django.contrib import messages


def index(request):
    """ This view returns the index page """
    return render(request, 'home/index.html')


def privacy_policy(request):
    """ This view returns the privacy policy page """
    return render(request, 'home/privacy.html')
