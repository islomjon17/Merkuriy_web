from django.db import models


class Category(models.Model):
    """
    Project categories such as Turar-joy, Tijoriy bino, Ta'mirlash, Landshaft, etc.
    """
    name = models.CharField(
        max_length=100,
        verbose_name="Kategoriya nomi"
    )
    slug = models.SlugField(
        max_length=120,
        unique=True,
        verbose_name="Kategoriya slugi (URL uchun)"
    )
    description = models.TextField(
        blank=True,
        default="",
        verbose_name="Kategoriya tavsifi"
    )

    class Meta:
        verbose_name = "Loyiha kategoriyasi"
        verbose_name_plural = "Loyiha kategoriyalari"
        ordering = ['name']

    def __str__(self):
        return self.name


class Project(models.Model):
    """
    Construction and renovation project showcase.
    """
    STATUS_CHOICES = [
        ('in_progress', 'Jarayonda'),
        ('completed', 'Tugallangan'),
    ]

    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='projects',
        verbose_name="Kategoriya"
    )
    title = models.CharField(
        max_length=255,
        verbose_name="Loyiha nomi"
    )
    short_description = models.TextField(
        help_text="for cards/slider",
        verbose_name="Qisqa tavsif"
    )
    full_description = models.TextField(
        help_text="materials, execution",
        verbose_name="Batafsil tavsif (materiallar va bajarilish bosqichlari)"
    )
    volume = models.CharField(
        max_length=100,
        help_text="e.g. '450 kv.m'",
        verbose_name="Hajmi / Maydoni"
    )
    location = models.CharField(
        max_length=255,
        help_text="e.g. 'Toshkent sh., Yunusobod'",
        verbose_name="Loyiha manzili / Joylashuvi"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='completed',
        verbose_name="Loyiha holati"
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name="Tanlangan loyiha (Featured)?"
    )
    budget = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        null=True,
        blank=True,
        default=1000000000.00,
        verbose_name="Loyihaga ajratilgan summa (so'm)",
        help_text="Loyihaning umumiy byudjeti yoki ajratilgan summa (default: 1.000.000.000)"
    )

    # Hero Slider Fields
    show_in_hero = models.BooleanField(
        default=False,
        help_text="Bosh sahifa slayderida ko'rsatish",
        verbose_name="Bosh sahifa slayderida ko'rsatilsinmi?"
    )
    hero_image = models.ImageField(
        upload_to='projects/hero/',
        blank=True,
        null=True,
        help_text="Full-size 1920x1080 banner",
        verbose_name="Hero slayder rasmi (1920x1080)"
    )

    # Media & Progress Fields
    main_thumbnail = models.ImageField(
        upload_to='projects/thumbnails/',
        verbose_name="Asosiy miniatyura rasmi"
    )
    before_image = models.ImageField(
        upload_to='projects/before_after/',
        null=True,
        blank=True,
        verbose_name="Ta'mirdan oldingi rasm (Before)"
    )
    after_image = models.ImageField(
        upload_to='projects/before_after/',
        null=True,
        blank=True,
        verbose_name="Ta'mirdan keyingi rasm (After)"
    )
    satellite_image = models.ImageField(
        upload_to='projects/satellite/',
        null=True,
        blank=True,
        verbose_name="Sun'iy yo'ldosh xaritasi rasmi"
    )
    satellite_link = models.URLField(
        null=True,
        blank=True,
        verbose_name="Sun'iy yo'ldosh yoki xarita havolasi"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Yaratilgan sana"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Yangilangan sana"
    )

    @property
    def budget_formatted(self):
        if self.budget is not None:
            int_val = int(self.budget)
            formatted = f"{int_val:,}".replace(',', ' ')
            return f"{formatted} so'm"
        return None

    class Meta:
        verbose_name = "Loyiha"
        verbose_name_plural = "Loyihalar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ProjectGallery(models.Model):
    """
    Supplementary gallery photos for a specific project.
    """
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='gallery',
        verbose_name="Tegishli loyiha"
    )
    image = models.ImageField(
        upload_to='projects/gallery/',
        verbose_name="Galereya rasmi"
    )
    caption = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name="Rasm izohi"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Yuklangan vaqt"
    )

    class Meta:
        verbose_name = "Loyiha galereya rasmi"
        verbose_name_plural = "Loyiha galereya rasmlari"
        ordering = ['id']

    def __str__(self):
        return f"{self.project.title} - Rasm #{self.id}"
