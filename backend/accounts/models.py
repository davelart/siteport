from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.
class LogisticsProfile(models.Model):
    class VehicleType(models.TextChoices):
        ABOYA = 'Aboboyaa', 'Aboboyaa'
        ABOM = 'Aboseokai macho', 'Aboseokai macho'
        TRUCK = 'Truck', 'Truck'
        VAN = 'Van', 'Van'

    class KYCStatus(models.TextChoices):
        P = 'Pending', 'Pending'
        A = 'Approved', 'Approved'
        R = 'Rejected', 'Rejected'

    user = models.OneToOneField(User, related_name='logistics_profile', on_delete=models.CASCADE)
    vehicle_type = models.CharField(max_length=255, choices=VehicleType.choices, default=VehicleType.ABOYA)
    vehicle_number = models.CharField(max_length=255, blank=True, null=True)
    license_number = models.CharField(max_length=255, blank=True, null=True)
    driver_photo = models.URLField(blank=True, null=True)
    vehicle_photo = models.URLField(blank=True, null=True)
    kyc_status = models.CharField(max_length=255, choices=KYCStatus.choices, default=KYCStatus.P)
    availability = models.BooleanField(default=True)
    current_location = models.CharField(max_length=100, blank=True, null=True, help_text="Store coordinates as 'latitude,longitude'")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Logistics Profile'
        verbose_name_plural = 'Logistics Profiles'

    def __str__(self):
        return self.vehicle_type

# Vendor Profile model
class VendorProfile(models.Model):
    class KYCStatus(models.TextChoices):
        P = 'Pending', 'Pending'
        A = 'Approved', 'Approved'
        R = 'Rejected', 'Rejected'
    
    user = models.OneToOneField(User, related_name='vendor_profile', on_delete=models.CASCADE)
    business_name = models.CharField(max_length=100, default='')
    business_type = models.CharField(max_length=100, default='')
    business_address = models.CharField(max_length=255, blank=True, null=True)
    contact_name = models.CharField(max_length=100, default='')
    contact_phone = models.CharField(max_length=15, blank=True, null=True)
    kyc_documents = models.FileField(upload_to='kyc_documents', blank=True, null=True)
    kyc_status = models.CharField(max_length=255, choices=KYCStatus.choices, default=KYCStatus.P)
    is_verified = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Vendor Profile'
        verbose_name_plural = 'Vendor Profiles'

    def __str__(self):
        return self.business_name

# Account model
class Account(models.Model):
    identifier = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, related_name='account', on_delete=models.CASCADE)
    logistics = models.ForeignKey(LogisticsProfile, related_name='account_logistics', on_delete=models.SET_NULL, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    photograph = models.URLField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    is_diaspora = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'

    def __str__(self):
        return str(self.user)

# Order model
class Order(models.Model):
    class Status(models.TextChoices):
        P = 'Pending', 'Pending'
        A = 'Accepted', 'Accepted'
        PU = 'Picked Up', 'Picked Up'
        IT = 'In Transit', 'In Transit'
        D = 'Delivered', 'Delivered'
        DS = 'Disputed', 'Disputed'
        C = 'Completed', 'Completed'
        CA = 'Cancelled', 'Cancelled'

    identifier = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
   
    customer = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    driver = models.ForeignKey(User, related_name='driver_orders', on_delete=models.SET_NULL, null=True)
    vendor = models.ForeignKey(User, related_name='vendor_orders', on_delete=models.SET_NULL, null=True)

    material_description = models.TextField(default='')
    delivery_address = models.CharField(max_length=255)
    delivery_otp = models.CharField(max_length=6, blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.P)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return self.identifier

# Escrow model
class Escrow(models.Model):
    class Status(models.TextChoices):
        P = 'Pending', 'Pending'    
        F = 'Funded', 'Funded'
        R = 'Released', 'Released'
        RF = 'Refunded', 'Refunded'
        D = 'Disputed', 'Disputed'
        C = 'Completed', 'Completed'
    
    identifier = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    order = models.OneToOneField(Order, related_name='escrow', on_delete=models.CASCADE)
    escrow_amount = models.DecimalField(max_digits=10, decimal_places=2)
    escrow_status = models.CharField(max_length=20, choices=Status.choices, default=Status.P)
    vendor_amount = models.DecimalField(max_digits=10, decimal_places=2)
    driver_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_funded = models.BooleanField(default=False)
    vendor_paid = models.BooleanField(default=False)
    driver_paid = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Escrow'
        verbose_name_plural = 'Escrows'

    def __str__(self):
        return self.identifier

# Review model
class Review(models.Model):
    identifier = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    order = models.ForeignKey(Order, related_name='reviews', on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, related_name='given_reviews', on_delete=models.CASCADE)
    reviewee = models.ForeignKey(User, related_name='received_reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'

    def __str__(self):
        return self.identifier