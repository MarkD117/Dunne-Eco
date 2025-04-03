from django.shortcuts import render


def door_builders(request):
    """ This view returns the stairs page """
    return render(request, 'stairs/stairs.html')
