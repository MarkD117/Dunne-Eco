from django import template
from urllib.parse import urlencode

register = template.Library()

@register.simple_tag
def build_querystring(query=None, category=None):
    params = {}
    if query:
        params["q"] = query
    if category:
        params["category"] = category
    return "&" + urlencode(params) if params else ""
