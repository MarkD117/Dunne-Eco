from django.shortcuts import render
from django.contrib import messages

# def index(request):
#     """ This view returns the index page """
#     return render(request, 'home/index.html')

def index(request):
    """ This view returns the index page """
    if 'test_toast' in request.GET:
        messages.success(request, "You have signed out. This is another part of the message to test the styling")
    return render(request, 'home/index.html')
