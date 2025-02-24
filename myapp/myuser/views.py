from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from myuser.models import MyUser


class RegisterAPIView(APIView):
    def post(self, request):
        name = request.data.get("username")
        email = request.data.get("email")
        phone_number = request.data.get("phone_number")
        password = request.data.get("password")

        if not name or not email or not phone_number or not password:
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if MyUser.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

        if MyUser.objects.filter(phone_number=phone_number).exists():
            return Response({"error": "Phone number already in use"}, status=status.HTTP_400_BAD_REQUEST)

        user = MyUser(name=name, email=email, phone_number=phone_number)
        user.set_password(password)  # Hash password
        user.save()

        return Response({
            "message": "User registered successfully",
            "uuid": str(user.uuid)  # Return the UUID
        }, status=status.HTTP_201_CREATED)


    


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = MyUser.objects.get(email=email)

            if user.check_password(password):
                user.is_login = True
                user.save()
                return Response({
                    "message": "Login successful",
                    "uuid": str(user.uuid)
                    }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        except MyUser.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        



class LogoutAPIView(APIView):
    def post(self,request):
        uuid = request.data.get("uuid")

        if not uuid:
            return Response({"error": "UUID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = MyUser.objects.get(uuid=uuid)
        except MyUser.DoesNotExist:
            return Response({"error": "Invalid UUID"}, status=status.HTTP_404_NOT_FOUND)
        
        user.is_login = False
        user.save()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


