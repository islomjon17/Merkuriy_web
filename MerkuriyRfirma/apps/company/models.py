from django.db import models
from apps.core.models import SingletonModel


class SiteConfiguration(SingletonModel):
    """
    Global site configuration including company branding, about info,
    achievements/stats, and promotional banner.
    """
    company_name = models.CharField(
        max_length=255,
        default="Merkuriy-R Xususiy qurilish firmasi",
        verbose_name="Kompaniya rasmiy nomi"
    )
    about_title = models.CharField(
        max_length=255,
        default="Biz haqimizda",
        verbose_name="Biz haqimizda sarlavhasi"
    )
    about_description = models.TextField(
        blank=True,
        default=(
            "Merkuriy-R xususiy qurilish firmasi ko'p yillik tajribaga ega bo'lib, "
            "turar-joy va tijoriy binolarni loyihalash, qurish va ta'mirlash ishlarini "
            "yuqori sifat standartlari asosida amalga oshiradi."
        ),
        verbose_name="Biz haqimizda batafsil tavsif"
    )

    # Statistics / Achievements
    years_experience = models.PositiveIntegerField(
        default=10,
        verbose_name="Yillik tajriba"
    )
    completed_projects = models.PositiveIntegerField(
        default=150,
        verbose_name="Tugallangan loyihalar soni"
    )
    master_workers = models.PositiveIntegerField(
        default=45,
        verbose_name="Mutaxassis ishchilar soni"
    )

    # Promotional Banner
    promo_active = models.BooleanField(
        default=False,
        verbose_name="Aksiya banneri faolmi?"
    )
    promo_title = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Aksiya sarlavhasi"
    )
    promo_description = models.TextField(
        blank=True,
        default="",
        verbose_name="Aksiya tavsifi"
    )

    class Meta:
        verbose_name = "Sayt asosiy sozlamalari"
        verbose_name_plural = "Sayt asosiy sozlamalari"

    def __str__(self):
        return self.company_name


class ContactInfo(SingletonModel):
    """
    Official contact details and social media channels.
    """
    primary_phone = models.CharField(
        max_length=50,
        default="+998 90 123 45 67",
        verbose_name="Asosiy telefon raqami"
    )
    secondary_phone = models.CharField(
        max_length=50,
        blank=True,
        default="",
        verbose_name="Qo'shimcha telefon raqami"
    )
    email = models.EmailField(
        default="info@merkuriy-r.uz",
        verbose_name="Rasmiy elektron pochta"
    )
    address = models.CharField(
        max_length=255,
        default="Toshkent shahri, Yunusobod tumani, Amir Temur shox ko'chasi",
        verbose_name="Ofis manzili"
    )
    working_hours = models.CharField(
        max_length=100,
        default="Dushanba - Shanba: 09:00 - 18:00",
        verbose_name="Ish vaqti"
    )

    # Social Media URLs
    telegram_url = models.URLField(
        blank=True,
        default="",
        verbose_name="Telegram havola"
    )
    instagram_url = models.URLField(
        blank=True,
        default="",
        verbose_name="Instagram havola"
    )
    facebook_url = models.URLField(
        blank=True,
        default="",
        verbose_name="Facebook havola"
    )
    youtube_url = models.URLField(
        blank=True,
        default="",
        verbose_name="YouTube havola"
    )

    class Meta:
        verbose_name = "Aloqa ma'lumotlari"
        verbose_name_plural = "Aloqa ma'lumotlari"

    def __str__(self):
        return f"Aloqa: {self.primary_phone} ({self.email})"


class Testimonial(models.Model):
    """
    Client reviews and testimonials.
    """
    RATING_CHOICES = [(i, f"{i} yulduz") for i in range(1, 6)]

    client_name = models.CharField(
        max_length=150,
        verbose_name="Mijoz ismi"
    )
    client_title = models.CharField(
        max_length=150,
        blank=True,
        default="",
        verbose_name="Lavozimi / Faoliyat sohasi / Tashkilot"
    )
    quote = models.TextField(
        verbose_name="Mijoz fikri / Izoh"
    )
    avatar = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True,
        verbose_name="Mijoz fotosurati"
    )
    rating = models.PositiveSmallIntegerField(
        default=5,
        choices=RATING_CHOICES,
        verbose_name="Baho (1-5)"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Saytda ko'rsatilsinmi?"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Qo'shilgan sana"
    )

    class Meta:
        verbose_name = "Mijoz fikri"
        verbose_name_plural = "Mijozlar fikrlari"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} - {self.rating}★"
