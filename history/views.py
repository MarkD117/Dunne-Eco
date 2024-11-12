from django.shortcuts import render

def history(request):
    """ This view returns the history page """
    return render(request, 'history/history.html')
