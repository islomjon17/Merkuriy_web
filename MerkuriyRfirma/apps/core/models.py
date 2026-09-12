from django.db import models


class SingletonModel(models.Model):
    """
    Abstract base model that guarantees only a single record exists
    in the database (pk=1). Ideal for global site settings and contact info.
    """

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        if kwargs.get('force_insert') and self.__class__.objects.filter(pk=1).exists():
            kwargs['force_insert'] = False
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Prevent deletion of singleton model instance
        pass

    @classmethod
    def get_solo(cls):
        """
        Retrieves the singleton instance, creating it if it doesn't exist yet.
        """
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
