from django.contrib import admin
from .models import Contact


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')
    list_filter = ('created_at',)
    readonly_fields = ('name', 'email', 'phone', 'subject', 'message')

    fieldsets = (
        ('Contact Details', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message Information', {
            'fields': ('subject', 'message', 'created_at')
        }),
    )

    # Orders by newest messages first
    ordering = ('-created_at',)


admin.site.register(Contact, ContactAdmin)