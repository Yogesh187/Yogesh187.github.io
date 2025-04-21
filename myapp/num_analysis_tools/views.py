import phonenumbers
from phonenumbers import geocoder, carrier
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myuser.models import MyUser
import uuid
from .models import IMEIRecord , IMSIRecord ,ICCIDRecord

class PhoneNumberAnalysisAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")

        if not phone_number:
            return Response({"error": "Phone number is required."}, status=status.HTTP_400_BAD_REQUEST)

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

        if not imei_number:
            return Response({"error": "IMEI number is required."}, status=status.HTTP_400_BAD_REQUEST)

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

        if not imsi_number:
            return Response({"error": "IMSI number is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not imsi_number.isdigit() or len(imsi_number) != 15:
            return Response({"error": "Invalid IMSI format. It should be a 15-digit number."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mcc = imsi_number[:3]
            mnc = imsi_number[3:5]

            imsi_data = IMSIRecord.objects.filter(mcc=int(mcc), mnc=int(mnc)).first()

            if not imsi_data:
                return Response({"error": "IMSI record not found."}, status=status.HTTP_404_NOT_FOUND)

            return Response({
                "imsi": imsi_number,
                "country": imsi_data.country,
                "network": imsi_data.network,
                "mcc": mcc,
                "mnc": mnc
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ICCIDAnalysisAPIView(APIView):
    def post(self, request):
        iccid = request.data.get("iccid")

        if not iccid:
            return Response({"error": "ICCID number is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not iccid.isdigit() or len(iccid) not in [19, 20]:
            return Response({"error": "Invalid ICCID format. Should be 19 or 20 digit number."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mii = iccid[:2]              # Usually '89' for telecom
            country_code = iccid[2:5]    # First 3 digits after MII
            issuer_code = iccid[5:7]     # Operator (example range, may vary)
            individual_id = iccid[7:-1]  # Main part
            check_digit = iccid[-1]      # Luhn check digit

            # Optional: Lookup from database using issuer_code
            iccid_data = ICCIDRecord.objects.filter(issuer_code=issuer_code).first()

            response_data = {
                "iccid": iccid,
                "mii": mii,
                "country_code": country_code,
                "issuer_code": issuer_code,
                "individual_id": individual_id,
                "check_digit": check_digit,
            }

            if iccid_data:
                response_data.update({
                    "country": iccid_data.country,
                    "network": iccid_data.network,
                })

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
