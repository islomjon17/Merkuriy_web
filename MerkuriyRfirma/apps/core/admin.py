from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse


class SingletonAdmin(admin.ModelAdmin):
    """
    Admin configuration for Singleton models.
    Disallows adding more than one instance and prevents deletion.
    """

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        """
        Directly redirect to the edit form if an instance already exists.
        """
        obj = self.model.objects.first()
        if obj:
            opts = self.model._meta
            return redirect(reverse(f'admin:{opts.app_label}_{opts.model_name}_change', args=[obj.pk]))
        return super().changelist_view(request, extra_context=extra_context)
