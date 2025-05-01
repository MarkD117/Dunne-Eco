from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse


def doors(request):
    """ This view returns the doors page """
    return render(request, 'doors/doors.html')


def unavailable_message(request):
    """ This view returns a temporary unavailable message """
    messages.info(
        request,
        "Unfortunately this feature is currently unavailable! "
        "If you would like to spec your own custom door, please contact us!"
    )
    return redirect(reverse('doors'))
