from django.db import models


class Lead(models.Model):
    """
    Client inquiry submitted via the website contact/consultation form.
    """
    STATUS_CHOICES = [
        ('new', 'Yangi'),
        ('contacted', "Bog'lanildi"),
        ('cancelled', 'Bekor qilindi'),
    ]

    name = models.CharField(
        max_length=150,
        verbose_name="Mijoz ismi"
    )
    phone_number = models.CharField(
        max_length=50,
        verbose_name="Telefon raqami"
    )
    project_type = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Qiziqayotgan xizmat yoki loyiha turi"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        verbose_name="Ariza holati"
    )
    notes = models.TextField(
        blank=True,
        default="",
        verbose_name="Menejer izohi"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Kelib tushgan vaqti"
    )

    class Meta:
        verbose_name = "Mijoz arizasi"
        verbose_name_plural = "Mijozlar arizalari"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.phone_number}) - {self.get_status_display()}"
