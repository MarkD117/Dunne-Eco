from django.shortcuts import render
from django.contrib import messages


def doors(request):
    """ This view returns the doors page """
    return render(request, 'doors/doors.html')
