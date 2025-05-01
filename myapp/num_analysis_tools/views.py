import phonenumbers
from phonenumbers import geocoder, carrier
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myuser.models import MyUser
import uuid
from .models import IMEIRecord , IMSIRecord ,ICCIDRecord

import json
import os
from django.conf import settings

json_path = os.path.join(settings.BASE_DIR, 'num_analysis_tools', 'extended_country_phone_codes.json')
with open(json_path, 'r') as f:
    PHONE_CODE_DATA = json.load(f)


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


            valid_mncs = IMSIRecord.objects.filter(country=country).values_list('mnc', flat=True)

            # Sort MNCs by length descending (to match longer codes first)
            valid_mncs = sorted([str(mnc) for mnc in valid_mncs if mnc is not None], key=lambda x: -len(x))

            network_code = None
            sequence_number = None

            # Try to match a valid MNC from the national number prefix
            for mnc_candidate in valid_mncs:
                if national_number.startswith(mnc_candidate):
                    network_code = mnc_candidate
                    sequence_number = national_number[len(mnc_candidate):]
                    break

            # If no match found
            if not network_code:
                return Response({"error": "No matching country_code and mnc found in DB for this phone number."}, status=status.HTTP_404_NOT_FOUND)

            return Response({
                "phone_number": phone_number,
                "country": country,
                "carrier": carrier_name,
                "network_code": network_code,
                "sequence_number": sequence_number
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class PhoneNumberAnalysisAPIView(APIView):
#     def post(self, request):
#         phone_number = request.data.get("phone_number")

#         if not phone_number:
#             return Response({"error": "Phone number is required."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             parsed_number = phonenumbers.parse(phone_number)

#             if not phonenumbers.is_valid_number(parsed_number):
#                 return Response({"error": "Invalid phone number."}, status=status.HTTP_400_BAD_REQUEST)

#             # Extract data
#             country = geocoder.description_for_number(parsed_number, "en")
#             carrier_name = carrier.name_for_number(parsed_number, "en")
#             national_number = str(parsed_number.national_number)

#             matched_entry = None
#             extracted_country_code = None
#             network_code = None
#             sequence_number = None

#             # Match JSON entries based on country
#             possible_entries = [entry for entry in PHONE_CODE_DATA if entry["country"].lower() == country.lower()]
            
#             for entry in possible_entries:
#                 cc = entry["country_code"]
#                 if national_number.startswith(cc):
#                     remaining = national_number[len(cc):]
#                     # Try 2 or 3 digit MNC
#                     for mnc_len in [2, 3]:
#                         candidate_mnc = remaining[:mnc_len]
#                         if candidate_mnc == entry["mnc"]:
#                             matched_entry = entry
#                             extracted_country_code = cc
#                             network_code = candidate_mnc
#                             sequence_number = remaining[mnc_len:]
#                             break
#                 if matched_entry:
#                     break

#             if not matched_entry:
#                 return Response({"error": "No matching country_code and mnc found in JSON for this phone number."}, status=status.HTTP_404_NOT_FOUND)

#             return Response({
#                 "phone_number": phone_number,
#                 "country": country,
#                 "carrier": carrier_name,
#                 "country_code": extracted_country_code,
#                 "network_code": network_code,
#                 "sequence_number": sequence_number,
#                 "operator": matched_entry["name"]
#             }, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    

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


class CreateIMEIRecordAPIView(APIView):
    def post(self, request):
        tac = request.data.get("tac")
        brand = request.data.get("brand")
        devices = request.data.get("devices")

        if not tac or not brand or not devices:
            return Response(
                {"error": "All fields (tac, brand, devices) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Optional: Check if TAC already exists
            if IMEIRecord.objects.filter(tac=tac).exists():
                return Response(
                    {"error": "Record with this TAC already exists."},
                    status=status.HTTP_409_CONFLICT
                )

            # Create the new record
            imei_record = IMEIRecord.objects.create(
                tac=tac,
                brand=brand,
                devices=devices
            )

            return Response({
                "message": "IMEI record created successfully.",
                "record": {
                    "id": imei_record.id,
                    "tac": imei_record.tac,
                    "brand": imei_record.brand,
                    "devices": imei_record.devices
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        

class IMSIAnalysisAPIView(APIView):
    def post(self, request):
        imsi_number = request.data.get("imsi")

        if not imsi_number:
            return Response({"error": "IMSI number is required."}, status=status.HTTP_400_BAD_REQUEST)

        # if not imsi_number.isdigit() or len(imsi_number) != 15:
        #     return Response({"error": "Invalid IMSI format. It should be a 15-digit number."}, status=status.HTTP_400_BAD_REQUEST)

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
            mii = iccid[:2]
            check_digit = iccid[-1]
            remaining = iccid[2:-1]  # skip MII and check digit

            selected_entry = None
            country_code_len = 0
            mnc_len = 0
            country_code = ""
            mnc = ""

            # Try all combinations: country_code (1–3 digits), mnc (2–3 digits)
            for c_len in range(1, 4):
                possible_country_code = remaining[:c_len]
                country_matches = [entry for entry in PHONE_CODE_DATA if entry["country_code"] == possible_country_code]
                if not country_matches:
                    continue

                for m_len in [2, 3]:
                    possible_mnc = remaining[c_len:c_len + m_len]
                    selected_entry = next((entry for entry in country_matches if entry["mnc"] == possible_mnc), None)
                    if selected_entry:
                        country_code = possible_country_code
                        mnc = possible_mnc
                        country_code_len = c_len
                        mnc_len = m_len
                        break

                if selected_entry:
                    break

            if not selected_entry:
                return Response({"error": "No matching country_code and mnc found in JSON."}, status=status.HTTP_404_NOT_FOUND)

            sequence_number = remaining[country_code_len + mnc_len:]

            is_valid = is_valid_luhn(iccid)

            response_data = {
                "iccid": iccid,
                "mii": mii,
                "country_name": selected_entry["country"],
                "country_code": country_code,
                "network_operator": selected_entry["name"],
                "network_code": mnc,
                "unique_number": sequence_number,
                "check_digit": check_digit,
                "luhn_valid": is_valid
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ManualMCCMNCEntryAPIView(APIView):
    def post(self, request):
        iccid = request.data.get("iccid")

        if not iccid:
            return Response({"error": "ICCID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not iccid.isdigit() or not (19 <= len(iccid) <= 20):
            return Response({"error": "Invalid ICCID format. It should be a 19 or 20 digit numeric string."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mii = iccid[:2]
            if mii != "89":
                return Response({"error": "Invalid MII. Expected telecom ICCID starting with '89'."}, status=status.HTTP_400_BAD_REQUEST)

            # Try smart MCC/MNC combinations (same as your GET API logic)
            mcc_mnc_combinations = []

            # 3-digit MCC → try 3-digit MNC, then 2-digit MNC
            mcc_3 = iccid[2:5]
            mnc_3 = iccid[5:8]
            mnc_2 = iccid[5:7]
            mcc_mnc_combinations.append((mcc_3, mnc_3))
            mcc_mnc_combinations.append((mcc_3, mnc_2))

            # 2-digit MCC → try 3-digit MNC, then 2-digit MNC
            mcc_2 = iccid[2:4]
            mnc_3_alt = iccid[4:7]
            mnc_2_alt = iccid[4:6]
            mcc_mnc_combinations.append((mcc_2, mnc_3_alt))
            mcc_mnc_combinations.append((mcc_2, mnc_2_alt))

            # Search for existing match
            for mcc, mnc in mcc_mnc_combinations:
                try:
                    mcc_int = int(mcc)
                    mnc_int = int(mnc)
                    record = IMSIRecord.objects.filter(mcc=mcc_int, mnc=mnc_int).first()
                    if record:
                        return Response({"message": "MCC and MNC already exist. No new record created."}, status=status.HTTP_200_OK)
                except ValueError:
                    continue  # skip invalid mcc/mnc pairs

            # No matching record found → create using first valid mcc/mnc
            for mcc, mnc in mcc_mnc_combinations:
                try:
                    mcc_int = int(mcc)
                    mnc_int = int(mnc)

                    IMSIRecord.objects.create(
                        mcc=mcc_int,
                        mcc_int=mcc_int,
                        mnc=mnc_int,
                        mnc_int=mnc_int,
                        country="Unknown",
                        country_code=0,
                        network="Unknown"
                    )
                    return Response({"message": f"New record created with MCC={mcc_int} and MNC={mnc_int}."}, status=status.HTTP_201_CREATED)

                except ValueError:
                    continue  # skip invalid combo
                except Exception as e:
                    return Response({"error": f"Failed to create record: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"error": "Unable to extract valid MCC and MNC from ICCID."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

