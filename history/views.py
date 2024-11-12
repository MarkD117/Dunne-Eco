from django.shortcuts import render

def index(request):
    """ This view returns the history page """
    return render(request, 'history/history.html')
