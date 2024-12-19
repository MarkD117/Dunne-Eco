from django import forms
from .models import Brochure


class BrochureForm(forms.ModelForm):
    class Meta:
        model = Brochure
        fields = ('title', 'description', 'brochure_file')
