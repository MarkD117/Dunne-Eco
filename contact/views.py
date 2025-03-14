import logging
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm
import os

# Set up logging
logger = logging.getLogger(__name__)

def contact(request):
    """ This view handles submitting the contact form and sending an email """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_message = form.save()

            # Send email
            subject = f"New Contact Form Submission: {contact_message.subject}"
            message = (
                f"Name: {contact_message.name}\n"
                f"Email: {contact_message.email}\n"
                f"Phone: {contact_message.phone or 'N/A'}\n"
                f"Message:\n{contact_message.message}"
            )
            # Get the 'from' email address (with fallback)
            from_email = os.environ.get('EMAIL_HOST_USER', 'sandra@dunneeco.com')
            recipient_list = ['sandra@dunneeco.com']

            try:
                send_mail(subject, message, from_email, recipient_list, fail_silently=False)
                messages.success(request, 'Your message has been sent to the team!')
            except Exception as e:
                # Log the error for debugging purposes
                logger.error(f"Error sending email: {str(e)}")
                messages.error(request, 'Error sending message. Please try again.')

            return redirect('home')
        else:
            messages.error(request, 'There was an error with your submission. Please try again.')

    else:
        form = ContactForm()

    context = {'form': form}
    return render(request, 'contact/contact.html', context)
