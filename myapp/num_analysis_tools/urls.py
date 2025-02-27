from django.urls import path
from .views import PhoneNumberAnalysisAPIView

urlpatterns = [
    path('analyze-phone/', PhoneNumberAnalysisAPIView.as_view(), name='analyze_phone'),
]