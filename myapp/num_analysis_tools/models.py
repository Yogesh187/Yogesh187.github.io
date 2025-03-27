from django.db import models


class IMEIRecord(models.Model):
    id = models.AutoField(primary_key=True)  # Ensure primary key matches your schema
    tac = models.CharField(max_length=250, unique=True)
    brand = models.CharField(max_length=250)
    devices = models.TextField()

    class Meta:
        db_table = 'myuser_tac'  


class IMSIRecord(models.Model):
    id = models.AutoField(primary_key=True)
    mcc = models.IntegerField(null=True, blank=True)            
    mcc_int = models.IntegerField(null=True, blank=True)  
    mnc = models.IntegerField(null=True, blank=True)            
    mnc_int = models.IntegerField(null=True, blank=True)  
    iso = models.CharField(max_length=150, null=True, blank=True)  
    country = models.CharField(max_length=150, null=True, blank=True) 
    country_code = models.IntegerField(null=True, blank=True)   
    country_code_add = models.IntegerField(null=True, blank=True, db_column="Country Code_add")  
    network = models.CharField(max_length=150, null=True, blank=True)  

    class Meta:
        db_table = "mcc_mnc_table"  
        managed = False  
      
