from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.projects.models import Category, Project, ProjectGallery


class ProjectsAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.cat1 = Category.objects.create(name="Turar-joy", slug="turar-joy")
        self.cat2 = Category.objects.create(name="Tijoriy", slug="tijoriy")

        self.proj1 = Project.objects.create(
            category=self.cat1,
            title="Loyiha 1",
            short_description="Qisqa 1",
            full_description="To'liq 1",
            volume="1000 kv.m",
            location="Toshkent",
            status="completed",
            is_featured=True
        )
        self.proj2 = Project.objects.create(
            category=self.cat2,
            title="Loyiha 2",
            short_description="Qisqa 2",
            full_description="To'liq 2",
            volume="2000 kv.m",
            location="Samarqand",
            status="in_progress",
            is_featured=False
        )

        self.gallery1 = ProjectGallery.objects.create(
            project=self.proj1,
            caption="Obyekt fasadi"
        )

    def test_categories_list(self):
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 2)
        # Check projects count annotation/property
        turar_cat = next(c for c in data if c['slug'] == 'turar-joy')
        self.assertEqual(turar_cat['projects_count'], 1)

    def test_projects_list_all(self):
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_projects_list_filter_category(self):
        url = f"{reverse('project-list')}?category=turar-joy"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], "Loyiha 1")

    def test_projects_list_filter_status(self):
        url = f"{reverse('project-list')}?status=in_progress"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], "Loyiha 2")

    def test_project_detail_view(self):
        url = reverse('project-detail', args=[self.proj1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['title'], "Loyiha 1")
        self.assertEqual(data['volume'], "1000 kv.m")
        self.assertEqual(len(data['gallery']), 1)
        self.assertEqual(data['gallery'][0]['caption'], "Obyekt fasadi")
