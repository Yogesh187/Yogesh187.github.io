from django.urls import path
from .views import PhoneNumberAnalysisAPIView ,IMEILookupAPIView ,IMSIAnalysisAPIView,ICCIDAnalysisAPIView ,CreateIMEIRecordAPIView

urlpatterns = [
    path('analyze-phone/', PhoneNumberAnalysisAPIView.as_view(), name='analyze_phone'),
    path('analyze-imei/',IMEILookupAPIView.as_view(),name='analyze-imei'),
    path('create-imei/',CreateIMEIRecordAPIView.as_view(),name='create-imei'),
    path('analyze-imsi/',IMSIAnalysisAPIView.as_view(),name='analyze-imsi'),
    path('analyze-iccid/',ICCIDAnalysisAPIView.as_view(),name='analyze-iccid')
]