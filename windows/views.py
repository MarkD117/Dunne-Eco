from django.shortcuts import render


def windows(request):
    """ This view returns the windows page """
    return render(request, 'windows/windows.html')
