import phonenumbers
from phonenumbers import geocoder, carrier
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myuser.models import MyUser
import uuid
from .models import IMEIRecord , IMSIRecord

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
        



class IMEILookupAPIView(APIView):
    def post(self, request):
        imei_number = request.data.get("imei")
        user_uuid = request.data.get("uuid")

        if not imei_number or not user_uuid:
            return Response({"error": "IMEI number is required."}, status=status.HTTP_400_BAD_REQUEST)
        
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
            tac_prefix = imei_number[:8]  
            imei_data = IMEIRecord.objects.get(tac=tac_prefix)

            return Response({
                "imei": imei_number,
                "brand": imei_data.brand,
                "device": imei_data.devices,
            }, status=status.HTTP_200_OK)

        except IMEIRecord.DoesNotExist:
            return Response({"error": "IMEI not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class IMSIAnalysisAPIView(APIView):
    def post(self, request):
        imsi_number = request.data.get("imsi")
        user_uuid = request.data.get("uuid")

        if not imsi_number or not user_uuid:
            return Response({"error": "IMSI number and UUID are required."}, status=status.HTTP_400_BAD_REQUEST)

        if not imsi_number.isdigit() or len(imsi_number) != 15:
            return Response({"error": "Invalid IMSI format. It should be a 15-digit number."}, status=status.HTTP_400_BAD_REQUEST)

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
            mcc = imsi_number[:3]
            mnc = imsi_number[3:5]

            # Ensure correct field names (case-sensitive)
            imsi_data = IMSIRecord.objects.filter(mcc=int(mcc), mnc=int(mnc)).first()

            return Response({
                "imsi": imsi_number,
                "country": imsi_data.country,
                "network": imsi_data.network,
                "mcc": mcc,
                "mnc": mnc
            }, status=status.HTTP_200_OK)

        except IMSIRecord.DoesNotExist:
            return Response({"error": "IMSI record not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
