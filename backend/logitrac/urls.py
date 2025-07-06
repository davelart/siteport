from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from rest_framework.routers import DefaultRouter
from accounts.views import (
    AccountsViewSet,
    OrderViewSet,
    EscrowViewSet,
    ReviewViewSet,
    LogisticsProfileViewSet,
    VendorProfileViewSet
)

# V1 Routers
router_v1 = DefaultRouter(trailing_slash=False)

# Accounts
router_v1.register(r'accounts', AccountsViewSet, basename='account') # This will handle all account endpoints
router_v1.register(r'logistics-profiles', LogisticsProfileViewSet, basename='logistics-profile')
router_v1.register(r'vendor-profiles', VendorProfileViewSet, basename='vendor-profile')
router_v1.register(r'orders', OrderViewSet, basename='order')
router_v1.register(r'escrows', EscrowViewSet, basename='escrow')
router_v1.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', RedirectView.as_view(pattern_name='redoc')), # This will handle all redoc endpoints
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')), # This will handle all rest framework endpoints

    path('v1/', include(router_v1.urls)),
    path('', include(router_v1.urls)),
    path('auth/', include('accounts.urls')), # This will handle all authentication endpoints
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'), # This will handle all schema endpoints
    path('docs/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'), # This will handle all redoc endpoints
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'), # This will handle all swagger endpoints

    path('admin/', admin.site.urls), # This will handle all admin endpoints
    path('tinymce/', include('tinymce.urls')), # This will handle all tinymce endpoints
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)