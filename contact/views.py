from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm


def contact(request):
    """ This view handles submitting the contact form """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(
                request,
                'Your message has been sent to the team!'
            )
            return redirect('home')
        else:
            messages.error(
                request,
                'There was an error with your submission. '
                'Please check the form and try again.'
            )
    else:
        form = ContactForm()

    context = {
        'form': form
    }

    return render(request, 'contact/contact.html', context)
