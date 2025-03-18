import logging
import os
import requests
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from .forms import ContactForm

# Set up logging
logger = logging.getLogger(__name__)

def contact(request):
    """ This view handles submitting the contact form and sending an email """
    if request.method == 'POST':
        form = ContactForm(request.POST)

        # Verify reCAPTCHA
        recaptcha_response = request.POST.get('g-recaptcha-response')
        recaptcha_secret_key = os.environ.get('RECAPTCHA_PRIVATE_KEY')  # Private key from environment variables

        # Send the request to the Google reCAPTCHA verification endpoint
        recaptcha_url = 'https://www.google.com/recaptcha/enterprise/verify'
        recaptcha_data = {
            'secret': recaptcha_secret_key,
            'response': recaptcha_response,
            'sitekey': os.environ.get('RECAPTCHA_PUBLIC_KEY')  # Required for Enterprise
        }

        try:
            recaptcha_result = requests.post(recaptcha_url, data=recaptcha_data)
            recaptcha_json = recaptcha_result.json()

            # Log the response for debugging
            logger.info(f"reCAPTCHA response: {recaptcha_json}")

            # Extract score (Enterprise reCAPTCHA uses riskAnalysis)
            score = recaptcha_json.get("riskAnalysis", {}).get("score", 0)

            # Define a threshold (Google recommends 0.5+ as a safe score)
            if recaptcha_json.get('success') and score >= 0.5 and form.is_valid():
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
                if not recaptcha_json.get('success'):
                    messages.error(request, 'reCAPTCHA validation failed. Please try again.')
                elif score < 0.5:
                    messages.error(request, 'Suspicious activity detected. Please try again later.')
                else:
                    messages.error(request, 'There was an error with your submission. Please try again.')

        except Exception as e:
            logger.error(f"Error verifying reCAPTCHA: {e}")
            messages.error(request, 'reCAPTCHA verification failed. Please try again.')

    else:
        form = ContactForm()

    context = {
        'form': form,
        'RECAPTCHA_PUBLIC_KEY': settings.RECAPTCHA_PUBLIC_KEY
    }
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
