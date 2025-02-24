import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password, check_password

class MyUser(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)  
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)
    is_login = models.BooleanField(default=False)  # Track login status

    def set_password(self, raw_password):
        self.password = make_password(raw_password)  

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)  
    
