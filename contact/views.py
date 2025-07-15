import logging
import requests
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from django.conf import settings
from datetime import datetime
from .forms import ContactForm
import os

logger = logging.getLogger(__name__)


def contact(request):
    """ This view handles submitting the contact form and sending an email """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            secret_key = settings.RECAPTCHA_PRIVATE_KEY

            # Get reCAPTCHA response
            recaptcha_response = request.POST.get('g-recaptcha-response')
            data = {
                'response': recaptcha_response,
                'secret': secret_key
            }

            # Verify reCAPTCHA
            resp = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data=data
            )
            result_json = resp.json()

            # Ensure reCAPTCHA passes & can adjust threshold if necessary
            recaptcha_passed = result_json.get('success')
            recaptcha_score = result_json.get('score', 0) < 0.5
            if not recaptcha_passed or recaptcha_score:
                messages.error(
                    request, 'ReCAPTCHA verification failed. Please try again.'
                )
                return redirect('contact-form')

            # Save form and send email
            contact_message = form.save()

            # Email to site owner
            subject = f"New Contact Form Submission: {contact_message.subject}"
            message = (
                f"Name: {contact_message.name}\n"
                f"Email: {contact_message.email}\n"
                f"Phone: {contact_message.phone or 'N/A'}\n"
                f"Message:\n{contact_message.message}"
            )
            from_email = os.environ.get(
                'EMAIL_HOST_USER', 'noreply@dunneeco.com'
            )
            recipient_list = [
                os.environ.get('EMAIL_GENERAL_CONTACT', 'info@dunneeco.com')
            ]

            try:
                send_mail(
                    subject,
                    message,
                    from_email,
                    recipient_list,
                    fail_silently=False
                )
                _send_confirmation_email(contact_message)
                messages.success(
                    request, 'Your message has been sent to the team!'
                )
            except Exception as e:
                logger.error(f"Error sending email: {e}")
                messages.error(
                    request, 'Error sending message. Please try again.'
                )

            return redirect('home')
        else:
            messages.error(
                request,
                'There was an error with your submission. Please try again.'
            )

    else:
        form = ContactForm()

    context = {
        'form': form,
        'RECAPTCHA_SITE_KEY': settings.RECAPTCHA_PUBLIC_KEY
    }
    return render(request, 'contact/contact.html', context)


def preview_confirmation_email(request):
    context = {
        'name': 'John Doe',
        'subject': 'New Front Door',
        'message': 'Hi, I was just wondering what price it would be to get a a front door like the one in your gallery. Its the sage green wardour style door. Would I be able to add glass panels to both sides of the door, and what options is there for glass on the top of the door? Thanks',
        'contact_email': 'info@dunneeco.com',
        'current_year': 2025,
    }
    html_content = render_to_string('contact/email_templates/confirmation_email_body.html', context)
    return HttpResponse(html_content)


def preview_owner_email(request):
    context = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'phone': '087 265 6783',
        'subject': 'New Front Door',
        'message': 'Hi, I was just wondering what price it would be to get a a front door like the one in your gallery. Its the sage green wardour style door. Would I be able to add glass panels to both sides of the door, and what options is there for glass on the top of the door? Thanks',
        'contact_email': 'info@dunneeco.com',
        'current_year': 2025,
    }
    html_content = render_to_string('contact/email_templates/owner_notification_body.html', context)
    return HttpResponse(html_content)
