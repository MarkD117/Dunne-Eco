from django.shortcuts import render

# Create your views here.
def gallery(request):
    """ This view returns the gallery page """
    return render(request, 'gallery/gallery.html')