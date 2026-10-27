from django.contrib import admin

from .forms import (
    BannerAdminForm,
    InitiativeAdminForm,
    ProjectAdminForm,
    BlogPostAdminForm,
    MediaItemAdminForm,
)
from .models import (
    Banner,
    VisionMission,
    Statistic,
    Initiative,
    Project,
    BlogPost,
    MediaItem,
    Donation,
    ContactMessage,
    VolunteerRegistration,
)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    form = BannerAdminForm
    list_display = ("title", "display_order", "status")
    list_filter = ("status",)
    search_fields = ("title", "description")


@admin.register(VisionMission)
class VisionMissionAdmin(admin.ModelAdmin):
    list_display = ("vision_title", "mission_title", "last_updated")


@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "display_order", "status")
    list_filter = ("status",)
    search_fields = ("label",)


@admin.register(Initiative)
class InitiativeAdmin(admin.ModelAdmin):
    form = InitiativeAdminForm
    list_display = ("title", "display_order", "status")
    list_filter = ("status",)
    search_fields = ("title", "description")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ("title", "location", "is_active", "created_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("title", "description", "location")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ("title", "author", "is_published", "created_at")
    list_filter = ("is_published", "created_at")
    search_fields = ("title", "content")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    form = MediaItemAdminForm
    list_display = ("title", "media_type", "created_at")
    list_filter = ("media_type", "created_at")
    search_fields = ("title", "description")


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = (
        "donor_name", "donor_email", "amount", "payment_status", "created_at",
    )
    list_filter = ("payment_status", "created_at")
    search_fields = ("donor_name", "donor_email", "payment_reference")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")


@admin.register(VolunteerRegistration)
class VolunteerRegistrationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("full_name", "email", "phone")
