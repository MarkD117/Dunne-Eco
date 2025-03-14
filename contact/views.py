import logging
from django.core.mail import send_mail
from django.template.loader import render_to_string
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

            # Email to site owner
            subject = f"New Contact Form Submission: {contact_message.subject}"
            message = (
                f"Name: {contact_message.name}\n"
                f"Email: {contact_message.email}\n"
                f"Phone: {contact_message.phone or 'N/A'}\n"
                f"Message:\n{contact_message.message}"
            )
            from_email = os.environ.get('EMAIL_HOST_USER', 'noreply@dunneeco.com')
            recipient_list = [os.environ.get('EMAIL_GENERAL_CONTACT', 'info@dunneeco.com')]

            try:
                send_mail(subject, message, from_email, recipient_list, fail_silently=False)

                # Send confirmation email to the user
                _send_confirmation_email(contact_message)

                messages.success(request, 'Your message has been sent to the team!')
            except Exception as e:
                logger.error(f"Error sending email: {e}")
                messages.error(request, 'Error sending message. Please try again.')

            return redirect('home')
        else:
            messages.error(request, 'There was an error with your submission. Please try again.')

    else:
        form = ContactForm()

    context = {'form': form}
    return render(request, 'contact/contact.html', context)

def _send_confirmation_email(contact_message):
    """Send a confirmation email to the user who submitted the contact form."""
    user_email = contact_message.email

    subject = render_to_string(
        'contact/email_templates/confirmation_email_subject.txt'
    ).strip()

    body = render_to_string(
        'contact/email_templates/confirmation_email_body.txt',
        {
            'name': contact_message.name,
            'subject': contact_message.subject,
            'message': contact_message.message,
            'contact_email': os.environ.get('EMAIL_GENERAL_CONTACT', 'info@dunneeco.com'),
        }
    )

    send_mail(
        subject,
        body,
        os.environ.get('EMAIL_HOST_USER', 'noreply@dunneeco.com'),
        [user_email],
        fail_silently=False
    )
