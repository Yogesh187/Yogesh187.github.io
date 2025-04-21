import phonenumbers
from phonenumbers import geocoder, carrier
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myuser.models import MyUser
import uuid
from .models import IMEIRecord , IMSIRecord ,ICCIDRecord

# class PhoneNumberAnalysisAPIView(APIView):
#     def post(self, request):
#         phone_number = request.data.get("phone_number")

#         if not phone_number:
#             return Response({"error": "Phone number is required."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             parsed_number = phonenumbers.parse(phone_number)

#             # Ensure phone number is valid
#             if not phonenumbers.is_valid_number(parsed_number):
#                 return Response({"error": "Invalid phone number."}, status=status.HTTP_400_BAD_REQUEST)

#             # Extract country and carrier information
#             country = geocoder.description_for_number(parsed_number, "en")
#             carrier_name = carrier.name_for_number(parsed_number, "en")

#             return Response({
#                 "phone_number": phone_number,
#                 "country": country,
#                 "carrier": carrier_name
#             }, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PhoneNumberAnalysisAPIView(APIView):
    def post(self, request):
        phone_number = request.data.get("phone_number")

        if not phone_number:
            return Response({"error": "Phone number is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            parsed_number = phonenumbers.parse(phone_number)

            if not phonenumbers.is_valid_number(parsed_number):
                return Response({"error": "Invalid phone number."}, status=status.HTTP_400_BAD_REQUEST)

            # Extract components
            country = geocoder.description_for_number(parsed_number, "en")
            carrier_name = carrier.name_for_number(parsed_number, "en")
            national_number = str(parsed_number.national_number)

            network_code = national_number[:3]
            sequence_number = national_number[3:]

            return Response({
                "phone_number": phone_number,
                "country": country,
                "carrier": carrier_name,
                "network_code": network_code,
                "sequence_number": sequence_number
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


def is_valid_luhn(number: str) -> bool:
    total = 0
    reverse_digits = number[::-1]
    for i, digit in enumerate(reverse_digits):
        n = int(digit)
        if i % 2 == 1:  # Every second digit from the right
            n *= 2
            if n > 9:
                n -= 9
        total += n
    return total % 10 == 0

class ICCIDAnalysisAPIView(APIView):
    def post(self, request):
        iccid = request.data.get("iccid")

        if not iccid:
            return Response({"error": "ICCID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not iccid.isdigit() or not (19 <= len(iccid) <= 20):
            return Response({"error": "Invalid ICCID format. It should be a 19 or 20 digit numeric string."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # ICCID structure: MMCC NNNN SSSSSSSS C
            mii = iccid[:2]  # Major Industry Identifier, usually '89'
            country_code = iccid[2:5]  # Next 2–3 digits for country (MCC)
            network_code = iccid[5:7]  # Next 2 digits for network (MNC)
            sequence_number = iccid[7:-1]  # Subscriber or SIM number
            check_digit = iccid[-1]  # Last digit

            # Validate with Luhn
            is_valid = is_valid_luhn(iccid)

            # Lookup using IMSIRecord (MCC and MNC)
            imsi_data = IMSIRecord.objects.filter(mcc=int(country_code), mnc=int(network_code)).first()

            response_data = {
                "iccid": iccid,
                "mii": mii,
                "country_code": country_code,
                "network_code": network_code,
                "sequence_number": sequence_number,
                "check_digit": check_digit,
                "luhn_valid": is_valid
            }

            if imsi_data:
                response_data["country"] = imsi_data.country
                response_data["network"] = imsi_data.network
            else:
                response_data["warning"] = "ICCID parsed but no matching IMSI record found."

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)