from django.shortcuts import render


def contact(request):
    """ This view returns the index page """
    return render(request, 'contact/contact.html')
