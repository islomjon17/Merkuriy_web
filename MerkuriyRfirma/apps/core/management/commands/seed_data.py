from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.company.models import SiteConfiguration, ContactInfo, Testimonial
from apps.projects.models import Category, Project, ProjectGallery
from apps.leads.models import Lead


class Command(BaseCommand):
    help = "Populate realistic sample data for Merkuriy-R Xususiy qurilish firmasi."

    def handle(self, *args, **options):
        # 1. Superuser
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@merkuriy-r.uz', 'admin12345')
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created."))

        # 2. SiteConfiguration
        config = SiteConfiguration.get_solo()
        config.company_name = "Merkuriy-R Xususiy qurilish firmasi"
        config.about_title = "Sifat va ishonch uyg'unlashgan qurilish"
        config.about_description = (
            "Merkuriy-R xususiy qurilish firmasi 10 yildan buyon O'zbekiston bo'ylab zamonaviy "
            "turar-joy majmualari, xususiy kottejlar va tijoriy biznes markazlarini eng yuqori sifat "
            "standartlari hamda xavfsizlik talablariga mos ravishda barpo etib kelmoqda."
        )
        config.years_experience = 12
        config.completed_projects = 180
        config.master_workers = 65
        config.promo_active = True
        config.promo_title = "Yangi mavsum aksiyasi: Loyihalash 15% chegirma bilan!"
        config.promo_description = "Shartnoma imzolagan barcha mijozlarga mualliflik nazorati va 3D dizayn loyihasi sovg'a qilinadi."
        config.save()
        self.stdout.write(self.style.SUCCESS("SiteConfiguration initialized."))

        # 3. ContactInfo
        contact = ContactInfo.get_solo()
        contact.primary_phone = "+998 71 200 44 55"
        contact.secondary_phone = "+998 90 999 88 77"
        contact.email = "info@merkuriy-r.uz"
        contact.address = "Toshkent shahri, Yunusobod tumani, Amir Temur shox ko'chasi 108-uy"
        contact.working_hours = "Dushanba - Shanba: 09:00 - 19:00"
        contact.telegram_url = "https://t.me/merkuriy_r_firma"
        contact.instagram_url = "https://instagram.com/merkuriy_r_qurilish"
        contact.facebook_url = "https://facebook.com/merkuriyrfirma"
        contact.youtube_url = "https://youtube.com/@merkuriy-r"
        contact.save()
        self.stdout.write(self.style.SUCCESS("ContactInfo initialized."))

        # 4. Testimonials
        if not Testimonial.objects.exists():
            Testimonial.objects.create(
                client_name="Aziz Rahimov",
                client_title="Biznesmen, 'Orient Group'",
                quote="Merkuriy-R jamoasi bizning yangi ofis binosi qurilishini belgilangan muddatdan 2 hafta oldin sifatli topshirdi. Ularning professional yondashuviga qoyil qoldik.",
                rating=5,
                is_active=True
            )
            Testimonial.objects.create(
                client_name="Nilufar Karimova",
                client_title="Xususiy xonadon egasi",
                quote="Yunusoboddagi kottejimizni to'liq ta'mirlash ishlarini Merkuriy-R ga topshirdik. Barcha pardozlash materiallari sifati a'lo darajada.",
                rating=5,
                is_active=True
            )
            Testimonial.objects.create(
                client_name="Jamshid Usmonov",
                client_title="Restoranlar tarmog'i boshqaruvchisi",
                quote="Tijoriy obyektimiz dizayni va seysmik mustahkamligi barcha talablarga javob beradi. Ishonchli hamkor!",
                rating=5,
                is_active=True
            )
            self.stdout.write(self.style.SUCCESS("Testimonials created."))

        # 5. Categories
        cat_turar, _ = Category.objects.get_or_create(
            slug='turar-joy',
            defaults={'name': 'Turar-joy majmualari', 'description': 'Zamonaviy ko\'p qavatli uylar va xonadonlar'}
        )
        cat_tijoriy, _ = Category.objects.get_or_create(
            slug='tijoriy-binolar',
            defaults={'name': 'Tijoriy va ofis binolari', 'description': 'Biznes markazlari, savdo majmualari va ofislar'}
        )
        cat_kottej, _ = Category.objects.get_or_create(
            slug='premium-kottejlar',
            defaults={'name': 'Premium kottejlar', 'description': 'Shaxsiy hovli va villalar'}
        )
        cat_tamirlash, _ = Category.objects.get_or_create(
            slug='tamirlash',
            defaults={'name': 'Mukammal ta\'mirlash', 'description': 'Kapital va yevro ta\'mirlash ishlari'}
        )
        self.stdout.write(self.style.SUCCESS("Categories ready."))

        # 6. Projects
        if not Project.objects.exists():
            p1 = Project.objects.create(
                category=cat_turar,
                title="Yunusobod City Zamonaviy Turar-joy Majmuasi",
                short_description="12 qavatli shinam va barcha qulayliklarga ega premium klassdagi turar-joy majmuasi.",
                full_description="Monolit-karkas texnologiyasi, M400 markali beton, bazalt izolyatsiyasi, panoramik energiya tejamkor oynalar va yerosti avtoturargohi.",
                volume="18,500 kv.m",
                location="Toshkent sh., Yunusobod tumani",
                budget=28500000000.00,
                status="completed",
                is_featured=True,
                show_in_hero=True,
                satellite_link="https://maps.google.com/?q=41.3654,69.2891"
            )
            p2 = Project.objects.create(
                category=cat_tijoriy,
                title="Merkuriy Business Tower",
                short_description="A-klassdagi 8 qavatli biznes markazi va savdo maydonlari.",
                full_description="Shisha fasad, ventilyatsiyalanuvchi tizim, aqlli bino boshqaruvi (BMS), tezyurar liftlar.",
                volume="6,200 kv.m",
                location="Toshkent sh., Mirobod tumani",
                budget=15000000000.00,
                status="completed",
                is_featured=True,
                show_in_hero=True,
                satellite_link="https://maps.google.com/?q=41.3000,69.2600"
            )
            p3 = Project.objects.create(
                category=cat_kottej,
                title="Chorvoq Hillside Villa",
                short_description="Tog' yonbag'rida joylashgan zamonaviy ekologik villa.",
                full_description="Tabiiy tosh va yog'och pardozlash, quyosh panellari bilan ta'minlangan avtonom isitish tizimi, ochiq basseyn.",
                volume="650 kv.m",
                location="Toshkent viloyati, Bo'stonliq tumani",
                budget=1000000000.00,
                status="in_progress",
                is_featured=True,
                show_in_hero=False
            )
            ProjectGallery.objects.create(project=p1, caption="Fasad va kirish qismi ko'rinishi")
            ProjectGallery.objects.create(project=p1, caption="Bolalar maydonchasi va obodonlashtirilgan hovli")
            ProjectGallery.objects.create(project=p2, caption="Keng va yorug' biznes atriumi")
            self.stdout.write(self.style.SUCCESS("Projects & Gallery created."))

        # 7. Initial Lead
        if not Lead.objects.exists():
            Lead.objects.create(
                name="Rustam Aliyev",
                phone_number="+998901112233",
                project_type="Premium kottej qurilishi",
                status="new"
            )
            self.stdout.write(self.style.SUCCESS("Sample lead created."))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
