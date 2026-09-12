from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.company.models import SiteConfiguration, ContactInfo, Testimonial
from apps.projects.models import Category, Project


class CompanyAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Setup configuration
        self.config = SiteConfiguration.get_solo()
        self.config.company_name = "Merkuriy-R Xususiy qurilish firmasi"
        self.config.years_experience = 10
        self.config.completed_projects = 150
        self.config.master_workers = 45
        self.config.promo_active = True
        self.config.promo_title = "Chegirma"
        self.config.promo_description = "Aksiya tavsifi"
        self.config.save()

        # Setup contact info
        self.contact = ContactInfo.get_solo()
        self.contact.primary_phone = "+998901234567"
        self.contact.email = "info@merkuriy-r.uz"
        self.contact.telegram_url = "https://t.me/merkuriy"
        self.contact.save()

        # Setup testimonial
        self.testimonial = Testimonial.objects.create(
            client_name="Ali Valiyev",
            client_title="Direktor",
            quote="Zo'r sifat!",
            rating=5,
            is_active=True
        )

        # Setup hero project
        cat = Category.objects.create(name="Turar joy", slug="turar-joy")
        self.hero_project = Project.objects.create(
            category=cat,
            title="Slayder Loyihasi",
            short_description="Qisqa tavsif",
            full_description="Batafsil tavsif",
            volume="500 kv.m",
            location="Toshkent",
            show_in_hero=True
        )

    def test_get_home_endpoint(self):
        url = reverse('home')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertIn('site_configuration', data)
        self.assertIn('stats', data)
        self.assertIn('promo_banner', data)
        self.assertIn('testimonials', data)
        self.assertIn('hero_slides', data)

        self.assertEqual(data['site_configuration']['company_name'], "Merkuriy-R Xususiy qurilish firmasi")
        self.assertEqual(data['stats']['years_experience'], 10)
        self.assertEqual(len(data['testimonials']), 1)
        self.assertEqual(data['testimonials'][0]['client_name'], "Ali Valiyev")
        self.assertEqual(len(data['hero_slides']), 1)
        self.assertEqual(data['hero_slides'][0]['title'], "Slayder Loyihasi")

    def test_get_contact_endpoint(self):
        url = reverse('contact')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertEqual(data['primary_phone'], "+998901234567")
        self.assertEqual(data['email'], "info@merkuriy-r.uz")
        self.assertEqual(data['socials']['telegram_url'], "https://t.me/merkuriy")
