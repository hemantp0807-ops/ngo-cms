
from django.contrib import admin
from django.urls import path
from core.views import (
    home_api,
    projects_api,
    blog_api,
    media_api,
    contact_api,
    volunteer_api,
    donation_api,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', home_api, name='home_api'),
    path('api/projects/', projects_api, name='projects_api'),
    path('api/blog/', blog_api, name='blog_api'),
    path('api/media/', media_api, name='media_api'),
    path('api/contact/', contact_api, name='contact_api'),
    path('api/volunteer/', volunteer_api, name='volunteer_api'),
    path('api/donate/', donation_api, name='donation_api'),
]
