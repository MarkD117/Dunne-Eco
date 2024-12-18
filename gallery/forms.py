from django import forms
from .models import Category, Image

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name']  # Only the name field is editable; the slug is auto-generated

    def save(self, commit=True):
        """
        Override the save method to ensure the slug is generated only once.
        """
        instance = super().save(commit=False)
        if not instance.slug:  # Generate slug if it doesn't already exist
            from django.utils.text import slugify
            instance.slug = slugify(instance.name)
        if commit:
            instance.save()
        return instance


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['category', 'image', 'title']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Allow multiple image uploads via the widget
        self.fields['image'].widget.attrs.update({'multiple': True})
