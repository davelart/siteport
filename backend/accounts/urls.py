from django.urls import path, include
from .views import SignUpViewSet, SignInViewSet, ResetPasswordViewSet, ResetPasswordConfirmViewSet
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signin', SignInViewSet.as_view(), name='user_signin'),
    path('signup', SignUpViewSet.as_view(), name='user_signup'),
    path('refresh-token', TokenRefreshView.as_view(), name='user_refresh_token'),
    path('reset-password', ResetPasswordViewSet.as_view(), name='reset_password'),
    path('reset-password-confirm', ResetPasswordConfirmViewSet.as_view(), name='reset_password_confirm'),
]