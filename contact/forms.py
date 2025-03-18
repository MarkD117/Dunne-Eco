from django import forms
from .models import Contact


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        placeholders = {
            'name': 'Enter your full name',
            'email': 'Enter your email address',
            'phone': 'Optional: Enter your phone number',
            'subject': 'Enter the subject of your message',
            'message': 'Type your message here',
        }
        for field in self.fields:
            self.fields[field].widget.attrs.update({
                'class': 'contact-form-input'
            })
            
            if field in placeholders:
                self.fields[field].widget.attrs.update({
                    'placeholder': placeholders[field]
                })
