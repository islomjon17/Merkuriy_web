from django.test import TestCase
from apps.company.models import SiteConfiguration


class SingletonModelTestCase(TestCase):
    def test_singleton_preserves_pk_1(self):
        """Verify that SingletonModel always uses pk=1 and avoids duplication."""
        config1 = SiteConfiguration.get_solo()
        config1.company_name = "Merkuriy-R Test 1"
        config1.save()
        self.assertEqual(config1.pk, 1)

        # Attempt to create a second instance
        config2 = SiteConfiguration.objects.create(company_name="Merkuriy-R Test 2")
        self.assertEqual(config2.pk, 1)
        self.assertEqual(SiteConfiguration.objects.count(), 1)

        # Verify get_solo returns the existing record
        config3 = SiteConfiguration.get_solo()
        self.assertEqual(config3.company_name, "Merkuriy-R Test 2")
