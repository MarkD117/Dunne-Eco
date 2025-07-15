import logging
import os
import requests
from datetime import datetime
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail, EmailMultiAlternatives
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.timezone import now
from .forms import ContactForm

logger = logging.getLogger(__name__)

# Configurable reCAPTCHA threshold
RECAPTCHA_THRESHOLD = settings.RECAPTCHA_THRESHOLD


def contact(request):
    """Handle contact form submission, reCAPTCHA validation, and email sending."""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Verify reCAPTCHA
            recaptcha_response = request.POST.get('g-recaptcha-response')
            recaptcha_valid, recaptcha_score = _verify_recaptcha(recaptcha_response)

            if not recaptcha_valid or recaptcha_score < RECAPTCHA_THRESHOLD:
                logger.warning(f"reCAPTCHA failed. Score: {recaptcha_score}")
                messages.error(request, 'ReCAPTCHA verification failed. Please try again.')
                return redirect('contact-form')

            # Save form to database
            contact_message = form.save()

            # Send emails
            try:
                _send_owner_notification_email(contact_message)
            except Exception as e:
                logger.error(f"Error sending owner email: {e}", exc_info=True)

            try:
                _send_confirmation_email(contact_message)
            except Exception as e:
                logger.error(f"Error sending confirmation email: {e}", exc_info=True)

            messages.success(request, 'Your message has been sent to the team!')
            return redirect('home')
        else:
            messages.error(request, 'There was an error with your submission. Please try again.')

    else:
        form = ContactForm()

    context = {
        'form': form,
        'RECAPTCHA_SITE_KEY': settings.RECAPTCHA_PUBLIC_KEY
    }
    return render(request, 'contact/contact.html', context)


def _verify_recaptcha(recaptcha_response):
    """Verify Google reCAPTCHA v3 token."""
    try:
        resp = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'response': recaptcha_response,
                'secret': settings.RECAPTCHA_PRIVATE_KEY
            },
            timeout=5
        )
        result = resp.json()
        return result.get('success', False), result.get('score', 0.0)
    except requests.exceptions.RequestException as e:
        logger.error(f"reCAPTCHA verification failed: {e}", exc_info=True)
        return False, 0.0


def _send_owner_notification_email(contact_message):
    """Send notification email to the site owner."""
    context = {
        'name': contact_message.name,
        'email': contact_message.email,
        'phone': contact_message.phone or 'N/A',
        'subject': contact_message.subject,
        'message': contact_message.message,
        'current_year': now().year
    }
    subject = f"New Contact Form Submission: {contact_message.subject}"
    html_content = render_to_string('contact/email_templates/owner_notification_body.html', context)

    send_mail(
        subject,
        '',  # Plain text left empty since using HTML template
        os.environ.get('EMAIL_HOST_USER', 'noreply@dunneeco.com'),
        [os.environ.get('EMAIL_GENERAL_CONTACT', 'info@dunneeco.com')],
        html_message=html_content,
        fail_silently=False
    )


def _send_confirmation_email(contact_message):
    """Send confirmation email to the user who submitted the contact form."""
    user_email = contact_message.email
    context = {
        'name': contact_message.name,
        'subject': contact_message.subject,
        'message': contact_message.message,
        'contact_email': os.environ.get('EMAIL_GENERAL_CONTACT', 'info@dunneeco.com'),
        'current_year': now().year,
    }

    subject = render_to_string(
        'contact/email_templates/confirmation_email_subject.txt', context
    ).strip()

    html_content = render_to_string(
        'contact/email_templates/confirmation_email_body.html', context
    )
    text_content = render_to_string(
        'contact/email_templates/confirmation_email_body.txt', context
    )

    email = EmailMultiAlternatives(
        subject, text_content,
        os.environ.get('EMAIL_HOST_USER', 'noreply@dunneeco.com'),
        [user_email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


# ====== Development Preview Views ======

def preview_confirmation_email(request):
    context = {
        'name': 'John Doe',
        'subject': 'New Front Door',
        'message': 'Hi, I was just wondering what price it would be to get a front door like the one in your gallery...',
        'contact_email': 'info@dunneeco.com',
        'current_year': now().year,
    }
    html_content = render_to_string('contact/email_templates/confirmation_email_body.html', context)
    return HttpResponse(html_content)


def preview_owner_email(request):
    context = {
        'name': 'John Doe',
        'email': 'johndoe@gmail.com',
        'phone': '087 265 6783',
        'subject': 'New Front Door',
        'message': 'Hi, I was just wondering what price it would be to get a front door like the one in your gallery...',
        'contact_email': 'info@dunneeco.com',
        'current_year': now().year,
    }
    html_content = render_to_string('contact/email_templates/owner_notification_body.html', context)
    return HttpResponse(html_content)
