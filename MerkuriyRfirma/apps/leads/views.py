from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Lead
from .serializers import LeadCreateSerializer, LeadSerializer
from .services import dispatch_lead_background_tasks


class LeadCreateView(generics.CreateAPIView):
    """
    POST /api/leads/create/
    Public endpoint for prospective clients to submit inquiries.
    Saves the lead immediately and queues async background tasks (Email & Google Sheets)
    without blocking the HTTP response.
    """
    queryset = Lead.objects.all()
    serializer_class = LeadCreateSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = serializer.save()

        # Fire-and-forget async background workers (Email & Google Sheets)
        dispatch_lead_background_tasks(lead.id)

        response_data = {
            "status": "success",
            "message": "Arizangiz muvaffaqiyatli qabul qilindi. Tez orada mutaxassisimiz siz bilan bog'lanadi.",
            "lead": LeadSerializer(lead).data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
