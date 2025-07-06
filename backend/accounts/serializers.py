from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Account, LogisticsProfile, VendorProfile, Order, Escrow, Review
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
from django.utils import timezone
from django.contrib.auth.models import User

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'identifier',
            'user',
            'created',
            'updated'
        ]
        read_only_fields = ['identifier', 'created', 'updated']

class LogisticsProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = LogisticsProfile
        fields = [
            'user',
            'vehicle_type',
            'vehicle_number',
            'license_number',
            'driver_photo',
            'vehicle_photo',
            'kyc_status',
            'availability',
            'current_location',
            'created',
            'updated'
        ]
        read_only_fields = ['user', 'created', 'updated']

class VendorProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = VendorProfile
        fields = [
            'user',
            'business_name',
            'business_type',
            'business_address',
            'contact_name',
            'contact_phone',
            'kyc_documents',
            'kyc_status',
            'is_verified',
            'created',
            'updated'
        ]
        read_only_fields = ['user', 'created', 'updated']

class SignInSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['username'] = serializers.CharField()
        # self.fields['password'] = serializers.CharField(write_only=True)
        # self.fields.pop('username', None)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            try:
                # First try to find the user
                user = User.objects.get(username=username)
                
                # Check if the password is correct
                if not check_password(password, user.password):
                    raise serializers.ValidationError('Incorrect password')
                
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled')
                
                # Get token
                refresh = self.get_token(user)
                data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': {
                        'identifier': user.id,
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'email': user.email,
                    }
                }
                
                try:
                    account = Account.objects.get(user=user)
                    data['user']['account'] = {
                        'identifier': account.identifier,
                        'created_at': account.created,
                        'updated_at': account.updated,
                    }
                except Account.DoesNotExist:
                    pass
                
                return data
                
            except Account.DoesNotExist:
                raise serializers.ValidationError('User does not exist')
        
        raise serializers.ValidationError('Must include username and password')
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        return token

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = ['identifier', 'user', 'logistics', 'phone', 'photograph', 'address', 'country', 'region', 'city', 'zip_code', 'is_diaspora', 'is_verified', 'password', 'confirm_password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'identifier': {'required': False},
            'user': {'required': False},
            'logistics': {'required': False},
            'phone': {'required': False},
            'photograph': {'required': False},
            'address': {'required': False},
            'country': {'required': False},
            'region': {'required': False},
            'city': {'required': False},
            'zip_code': {'required': False},
            'is_diaspora': {'required': False},
            'is_verified': {'required': False},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError('User with this email already exists')
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )

        Account.objects.create(
            user=user,
            phone=validated_data['phone'],
            photograph=validated_data.get('photograph'),
            address=validated_data.get('address'),
            country=validated_data['country'],
            region=validated_data['region'],
            city=validated_data['city'],
            zip_code=validated_data['zip_code'],
            is_diaspora=validated_data.get('is_diaspora', False),
            is_verified=validated_data.get('is_verified', False),
        )
        
        return user

class OrderSerializer(serializers.ModelSerializer):
    customer_email = serializers.EmailField(source='customer.email', read_only=True)
    driver_email = serializers.EmailField(source='driver.email', read_only=True, allow_null=True)
    vendor_email = serializers.EmailField(source='vendor.email', read_only=True, allow_null=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'identifier',
            'customer', 'customer_email',
            'driver', 'driver_email',
            'vendor', 'vendor_email',
            'material_description',
            'delivery_address',
            'delivery_otp',
            'status', 'status_display',
            'total_amount',
            'created',
        ]
        read_only_fields = ['identifier', 'created', 'delivery_otp']
        extra_kwargs = {
            'customer': {'required': True},
            'status': {'read_only': True},
        }

    def validate(self, data):
        # Add any custom validation here
        return data

    def create(self, validated_data):
        # Set initial status
        validated_data['status'] = 'pending'
        return super().create(validated_data)

class EscrowSerializer(serializers.ModelSerializer):
    order_identifier = serializers.UUIDField(source='order.identifier', read_only=True)
    status_display = serializers.CharField(source='get_escrow_status_display', read_only=True)
    
    class Meta:
        model = Escrow
        fields = [
            'identifier',
            'order', 'order_identifier',
            'escrow_amount',
            'escrow_status', 'status_display',
            'vendor_amount',
            'driver_amount',
            'is_funded',
            'vendor_paid',
            'driver_paid',
            'created',
            'updated',
        ]
        read_only_fields = ['identifier', 'created', 'updated']
        extra_kwargs = {
            'order': {'required': True},
        }

    def validate(self, data):
        # Ensure vendor_amount + driver_amount equals escrow_amount
        if 'vendor_amount' in data and 'driver_amount' in data and 'escrow_amount' in data:
            if data['vendor_amount'] + data['driver_amount'] != data['escrow_amount']:
                raise serializers.ValidationError("The sum of vendor_amount and driver_amount must equal escrow_amount")
        return data

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_email = serializers.EmailField(source='reviewer.email', read_only=True)
    reviewee_email = serializers.EmailField(source='reviewee.email', read_only=True)
    order_identifier = serializers.UUIDField(source='order.identifier', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'identifier',
            'order', 'order_identifier',
            'reviewer', 'reviewer_email',
            'reviewee', 'reviewee_email',
            'rating',
            'comment',
            'created',
        ]
        read_only_fields = ['identifier', 'created']
        extra_kwargs = {
            'order': {'required': True},
            'reviewer': {'required': True},
            'reviewee': {'required': True},
        }

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    def validate(self, data):
        # Ensure reviewer and reviewee are different
        if data.get('reviewer') == data.get('reviewee'):
            raise serializers.ValidationError("Reviewer and reviewee cannot be the same user")
        return data
        
        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])
        
        # Create user
        user = User.objects.create(**validated_data)
        
        # Create account if it doesn't exist
        Account.objects.get_or_create(user=user)
        
        return user

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        user = User.objects.filter(email=value).first()
        if user is None:
            raise serializers.ValidationError('User with this email does not exist')
        return value

class ResetPasswordConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        uidb64 = data['uidb64']
        token = data['token']
        password = data['password']
        try:
            uid = urlsafe_base64_decode(uidb64)
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            raise serializers.ValidationError('User with this uid does not exist')
        
        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError('Invalid token')
        
        data['user'] = user
        return data

    