from django.contrib import admin
from .models import Account, LogisticsProfile, VendorProfile, Order, Escrow, Review

# Register your models here.
@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    search_fields = ('user',)
    list_display = ('user', 'created', 'updated')
    list_filter = ('created', 'updated')

@admin.register(LogisticsProfile)
class LogisticsProfileAdmin(admin.ModelAdmin):
    search_fields = ('vehicle_type', 'vehicle_number', 'license_number')
    list_display = ('vehicle_type', 'vehicle_number', 'license_number', 'created', 'updated')
    list_filter = ('created', 'updated')

@admin.register(VendorProfile)
class VendorProfileAdmin(admin.ModelAdmin):
    search_fields = ('business_name', 'business_type')
    list_display = ('business_name', 'business_type', 'created', 'updated')
    list_filter = ('created', 'updated')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    search_fields = ('customer', 'driver', 'vendor')
    list_display = ('customer', 'driver', 'vendor', 'created')
    list_filter = ('created',)

@admin.register(Escrow)
class EscrowAdmin(admin.ModelAdmin):
    search_fields = ('order',)
    list_display = ('order', 'created', 'updated')
    list_filter = ('created', 'updated')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    search_fields = ('order', 'reviewer', 'reviewee')
    list_display = ('order', 'reviewer', 'reviewee', 'created')
    list_filter = ('created',)