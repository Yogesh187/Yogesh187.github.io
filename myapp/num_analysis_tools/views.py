import phonenumbers
from phonenumbers import geocoder, carrier
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myuser.models import MyUser
import uuid

class PhoneNumberAnalysisAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")
        user_uuid = request.data.get("uuid")

        if not phone_number or not user_uuid:
            return Response({"error": "Phone number and UUID are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_uuid = uuid.UUID(user_uuid, version=4) 
        except ValueError:
            return Response({"error": "Invalid UUID format."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = MyUser.objects.get(uuid=user_uuid)
            if not user.is_login:
                return Response({"error": "User is not logged in."}, status=status.HTTP_403_FORBIDDEN)
        except MyUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            parsed_number = phonenumbers.parse(phone_number)

            # Ensure phone number is valid
            if not phonenumbers.is_valid_number(parsed_number):
                return Response({"error": "Invalid phone number."}, status=status.HTTP_400_BAD_REQUEST)

            # Extract country and carrier information
            country = geocoder.description_for_number(parsed_number, "en")
            carrier_name = carrier.name_for_number(parsed_number, "en")

            return Response({
                "phone_number": phone_number,
                "country": country,
                "carrier": carrier_name
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
