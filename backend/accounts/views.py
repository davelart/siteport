from psycopg2.errors import QueryCanceledError
from accounts.models import Account, LogisticsProfile, VendorProfile, Order, Escrow, Review
from rest_framework import generics, status, filters
from rest_framework.viewsets import ModelViewSet
from .serializers import (
    SignInSerializer, SignUpSerializer, ResetPasswordSerializer,
    ResetPasswordConfirmSerializer, AccountSerializer, OrderSerializer, EscrowSerializer, ReviewSerializer, LogisticsProfileSerializer, VendorProfileSerializer
)
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q
from rest_framework.response import Response

# Create your views here.
@extend_schema_view(
    list=extend_schema(tags=['Accounts'], summary='List all accounts'),
    create=extend_schema(tags=['Accounts'], summary='Create a new account'),
    retrieve=extend_schema(tags=['Accounts'], summary='Retrieve an account', examples=[]),
    update=extend_schema(tags=['Accounts'], summary='Update an account', examples=[]),
    partial_update=extend_schema(tags=['Accounts'], summary='Partial update an account', examples=[]),
    destroy=extend_schema(tags=['Accounts'], summary='Delete an account', examples=[]),
)
@permission_classes([IsAdminUser])
class AccountsViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    filter_backends = [DjangoFilterBackend]
    search_fields = ['user__email']
    ordering_fields = ['created']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']


@extend_schema_view(
    list=extend_schema(tags=['Logistics Profiles'], summary='List all logistics profiles'),
    create=extend_schema(tags=['Logistics Profiles'], summary='Create a new logistics profile'),
    retrieve=extend_schema(tags=['Logistics Profiles'], summary='Retrieve a logistics profile', examples=[]),
    update=extend_schema(tags=['Logistics Profiles'], summary='Update a logistics profile', examples=[]),
    partial_update=extend_schema(tags=['Logistics Profiles'], summary='Partial update a logistics profile', examples=[]),
    destroy=extend_schema(tags=['Logistics Profiles'], summary='Delete a logistics profile', examples=[]),
)
class LogisticsProfileViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = LogisticsProfile.objects.all()
    serializer_class = LogisticsProfileSerializer
    filter_backends = [DjangoFilterBackend]
    search_fields = ['user__email']
    ordering_fields = ['created']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    # override perform_create to set user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema_view(
    list=extend_schema(tags=['Vendor Profiles'], summary='List all vendor profiles'),
    create=extend_schema(tags=['Vendor Profiles'], summary='Create a new vendor profile'),
    retrieve=extend_schema(tags=['Vendor Profiles'], summary='Retrieve a vendor profile', examples=[]),
    update=extend_schema(tags=['Vendor Profiles'], summary='Update a vendor profile', examples=[]),
    partial_update=extend_schema(tags=['Vendor Profiles'], summary='Partial update a vendor profile', examples=[]),
    destroy=extend_schema(tags=['Vendor Profiles'], summary='Delete a vendor profile', examples=[]),
)
class VendorProfileViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = VendorProfile.objects.all()
    serializer_class = VendorProfileSerializer
    filter_backends = [DjangoFilterBackend]
    search_fields = ['user__email']
    ordering_fields = ['created']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@extend_schema_view(
    post=extend_schema(tags=['Sign In'], summary='Sign In into Account')
)
@permission_classes([AllowAny])
class SignInViewSet(TokenObtainPairView):
    serializer_class = SignInSerializer
    http_method_names = ['post']


@extend_schema_view(
    post=extend_schema(tags=['Sign Up'], summary='Sign Up into Account')
)
@permission_classes([AllowAny])
class SignUpViewSet(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = SignUpSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        account = user.account # fetch the related Account instance

        # generate token
        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)

        headers = self.get_success_headers(serializer.validated_data)
        return Response({
            'refresh': refresh_token,
            'access': access_token,
            'user': {
                'identifier': account.identifier,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': account.phone,
                'photograph': account.photograph,
                'address': account.address,
                'country': account.country,
                'region': account.region,
                'city': account.city,
                'zip_code': account.zip_code,
                'is_diaspora': account.is_diaspora,
                'is_verified': account.is_verified,
                'created': account.created,
                'updated': account.updated,
            },
        }, status=status.HTTP_201_CREATED, headers=headers)


@extend_schema_view(
    post=extend_schema(tags=['Reset Password'], summary='Reset Password')
)
@permission_classes([AllowAny])
class ResetPasswordViewSet(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({ 'message': 'User not found' }, status=status.HTTP_404_NOT_FOUND)

            token = default_token_generator.make_token(user)
            return Response({ 'message': 'Password reset email sent successfully' }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(
    post=extend_schema(tags=['Reset Password'], summary='Reset Password')
)
@permission_classes([AllowAny])
class ResetPasswordConfirmViewSet(generics.GenericAPIView):
    serializer_class = ResetPasswordConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            uidb64 = kwargs.get('uidb64')
            token = kwargs.get('token')
            password = serializer.validated_data['password']
            try:
                uid = urlsafe_base64_decode(uidb64)
                user = User.objects.get(pk=uid)
            except (User.DoesNotExist, TypeError, ValueError, OverflowError):
                return Response({'message': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)
            
            if user is not None and default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(
    list=extend_schema(tags=['Orders'], summary='List all orders'),
    create=extend_schema(tags=['Orders'], summary='Create a new order'),
    retrieve=extend_schema(tags=['Orders'], summary='Retrieve an order'),
    update=extend_schema(tags=['Orders'], summary='Update an order'),
    partial_update=extend_schema(tags=['Orders'], summary='Partial update an order'),
    destroy=extend_schema(tags=['Orders'], summary='Delete an order'),
)
class OrderViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    lookup_field = 'identifier'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'customer', 'driver', 'vendor']
    search_fields = ['material_description', 'delivery_address']
    ordering_fields = ['created', 'total_amount']
    ordering = ['-created']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        user = self.request.user
        # Users can see their own orders, or all orders if they are staff
        queryset = Order.objects.all()
        if not user.is_staff:
            queryset = queryset.filter(Q(customer=user) | Q(driver=user) | Q(vendor=user))
        return queryset

@extend_schema_view(
    list=extend_schema(tags=['Escrows'], summary='List all escrows'),
    create=extend_schema(tags=['Escrows'], summary='Create a new escrow'),
    retrieve=extend_schema(tags=['Escrows'], summary='Retrieve an escrow'),
    update=extend_schema(tags=['Escrows'], summary='Update an escrow'),
    partial_update=extend_schema(tags=['Escrows'], summary='Partial update an escrow'),
    destroy=extend_schema(tags=['Escrows'], summary='Delete an escrow'),
)
class EscrowViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = EscrowSerializer
    lookup_field = 'identifier'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['escrow_status', 'is_funded', 'vendor_paid', 'driver_paid']
    search_fields = ['order__identifier']
    ordering_fields = ['created', 'updated', 'escrow_amount']
    ordering = ['-created']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        user = self.request.user
        # Users can see escrows for their orders, or all escrows if they are staff
        queryset = Escrow.objects.all()
        if not user.is_staff:
            queryset = queryset.filter(Q(order__customer=user) | Q(order__driver=user) | Q(order__vendor=user))
        return queryset

@extend_schema_view(
    list=extend_schema(tags=['Reviews'], summary='List all reviews'),
    create=extend_schema(tags=['Reviews'], summary='Create a new review'),
    retrieve=extend_schema(tags=['Reviews'], summary='Retrieve a review'),
    update=extend_schema(tags=['Reviews'], summary='Update a review'),
    partial_update=extend_schema(tags=['Reviews'], summary='Partial update a review'),
    destroy=extend_schema(tags=['Reviews'], summary='Delete a review'),
)
class ReviewViewSet(ModelViewSet):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer
    lookup_field = 'identifier'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['reviewer', 'reviewee', 'order', 'rating']
    search_fields = ['comment']
    ordering_fields = ['created', 'rating']
    ordering = ['-created']
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        user = self.request.user
        # Users can see reviews they've given, received, or all reviews if they are staff
        queryset = Review.objects.all()
        if not user.is_staff:
            queryset = queryset.filter(Q(reviewer=user) | Q(reviewee=user))
        return queryset

    def perform_create(self, serializer):
        # Automatically set the reviewer to the current user
        serializer.save(reviewer=self.request.user)
        return Response({'message': 'Review created successfully'}, status=201)