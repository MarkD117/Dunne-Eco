from django import forms
from .models import Category, Image

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'friendly_name']


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['category', 'image', 'title']

    # Add support for multiple images
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['image'].widget.attrs.update({'multiple': True})
