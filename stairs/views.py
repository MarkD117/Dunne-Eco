from django.shortcuts import render


def stairs(request):
    """ This view returns the stairs page """
    return render(request, 'stairs/stairs.html')
