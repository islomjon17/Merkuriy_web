from unittest.mock import patch
from django.test import TransactionTestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.leads.models import Lead
from apps.leads.services import send_lead_email, sync_lead_to_sheets, dispatch_lead_background_tasks


class LeadsAPITests(TransactionTestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('lead-create')

    @patch('apps.leads.views.dispatch_lead_background_tasks')
    def test_create_lead_success(self, mock_dispatch):
        payload = {
            "name": "Otabek Madrahimov",
            "phone_number": "+998912345678",
            "project_type": "Kottej qurilishi",
        }
        response = self.client.post(self.url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        data = response.json()
        self.assertEqual(data['status'], 'success')
        self.assertEqual(data['lead']['name'], "Otabek Madrahimov")
        self.assertEqual(data['lead']['status'], "new")

        # Verify record exists in SQLite
        lead = Lead.objects.filter(name="Otabek Madrahimov").first()
        self.assertIsNotNone(lead)
        self.assertEqual(lead.phone_number, "+998912345678")
        self.assertEqual(lead.project_type, "Kottej qurilishi")

        # Verify background dispatch was called with lead.id
        mock_dispatch.assert_called_once_with(lead.id)

    def test_create_lead_validation_failure(self):
        # Invalid phone and too short name
        payload = {
            "name": "A",
            "phone_number": "abc",
            "project_type": "Qurilish",
        }
        response = self.client.post(self.url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        data = response.json()
        self.assertIn('name', data)
        self.assertIn('phone_number', data)

    def test_send_lead_email_service(self):
        lead = Lead.objects.create(
            name="Test Mijoz",
            phone_number="+998901112233",
            project_type="Bino ta'mirlash"
        )
        # Should execute cleanly without raising exception using console backend
        send_lead_email(lead.id)

    def test_sync_lead_to_sheets_service_without_credentials(self):
        lead = Lead.objects.create(
            name="Test Mijoz 2",
            phone_number="+998909998877",
            project_type="Loyiha"
        )
        # Should gracefully log and skip without raising any error
        sync_lead_to_sheets(lead.id)

    def test_dispatch_lead_background_tasks(self):
        lead = Lead.objects.create(
            name="Test Mijoz 3",
            phone_number="+998903334455",
            project_type="Fasad ishlari"
        )
        # Submit tasks to executor without blocking
        dispatch_lead_background_tasks(lead.id)
