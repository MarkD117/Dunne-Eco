from django.shortcuts import render
from django.template import RequestContext

def handler404(request, exception):
    """ Error Handler 404 - Page Not Found """
    return render(request, "errors/404.html", {}, status=404)
