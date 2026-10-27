import os
import uuid

from django import forms
from PIL import Image, UnidentifiedImageError

from .models import Banner, Initiative, Project, BlogPost, MediaItem
from .supabase_storage import upload_image


ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5 MB


class SupabaseImageUploadForm(forms.ModelForm):
    """Reusable admin form for uploading an image to Supabase Storage."""

    image_file = forms.FileField(
        required=False,
        label="Upload image",
        help_text="Allowed formats: JPG, JPEG, PNG, WEBP. Maximum size: 5 MB.",
    )
    url_field_name = "image_url"
    storage_folder = "images"
    image_required = False

    def clean_image_file(self):
        uploaded_file = self.cleaned_data.get("image_file")
        if not uploaded_file:
            return uploaded_file

        extension = os.path.splitext(uploaded_file.name)[1].lower()
        if extension not in ALLOWED_IMAGE_EXTENSIONS:
            raise forms.ValidationError(
                "Upload a JPG, JPEG, PNG, or WEBP image."
            )
        if uploaded_file.size > MAX_IMAGE_SIZE:
            raise forms.ValidationError("Image size must not exceed 5 MB.")

        # Verify the file is a real, readable image, not just a renamed file.
        try:
            uploaded_file.seek(0)
            with Image.open(uploaded_file) as image:
                image.verify()
            uploaded_file.seek(0)
        except (UnidentifiedImageError, OSError, ValueError):
            uploaded_file.seek(0)
            raise forms.ValidationError("The selected file is not a valid image.")

        return uploaded_file

    def clean(self):
        cleaned_data = super().clean()
        image_url = cleaned_data.get(self.url_field_name)
        image_file = cleaned_data.get("image_file")
        if self.image_required and not image_url and not image_file:
            raise forms.ValidationError(
                "Please enter an image URL or upload an image."
            )
        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        uploaded_file = self.cleaned_data.get("image_file")

        if uploaded_file:
            extension = os.path.splitext(uploaded_file.name)[1].lower()
            file_name = f"{self.storage_folder}/{uuid.uuid4().hex}{extension}"
            public_url = upload_image(uploaded_file, file_name)
            setattr(instance, self.url_field_name, public_url)

        if commit:
            instance.save()
            self.save_m2m()
        return instance


class BannerAdminForm(SupabaseImageUploadForm):
    image_url = forms.URLField(required=False, label="Image URL")
    image_file = forms.FileField(
        required=False,
        label="Upload banner image",
        help_text="Allowed formats: JPG, JPEG, PNG, WEBP. Maximum size: 5 MB.",
    )
    storage_folder = "banners"
    image_required = True

    class Meta:
        model = Banner
        fields = [
            "title", "description", "image_url", "display_order", "status",
            "image_file",
        ]


class InitiativeAdminForm(SupabaseImageUploadForm):
    image_url = forms.URLField(required=False, label="Image URL")
    image_file = forms.FileField(required=False, label="Upload initiative image")
    storage_folder = "initiatives"

    class Meta:
        model = Initiative
        fields = [
            "title", "description", "image_url", "display_order", "status",
            "image_file",
        ]


class ProjectAdminForm(SupabaseImageUploadForm):
    image_url = forms.URLField(required=False, label="Image URL")
    image_file = forms.FileField(required=False, label="Upload project image")
    storage_folder = "projects"

    class Meta:
        model = Project
        fields = [
            "title", "slug", "description", "location", "start_date",
            "end_date", "image_url", "is_active", "image_file",
        ]


class BlogPostAdminForm(SupabaseImageUploadForm):
    image_url = forms.URLField(required=False, label="Image URL")
    image_file = forms.FileField(required=False, label="Upload blog image")
    storage_folder = "blogs"

    class Meta:
        model = BlogPost
        fields = [
            "title", "slug", "content", "author", "image_url",
            "is_published", "image_file",
        ]


class MediaItemAdminForm(SupabaseImageUploadForm):
    media_url = forms.URLField(required=False, label="Media URL")
    image_file = forms.FileField(
        required=False,
        label="Upload media image",
        help_text="For image items only. JPG, PNG, or WEBP; maximum 5 MB.",
    )
    url_field_name = "media_url"
    storage_folder = "media"

    class Meta:
        model = MediaItem
        fields = [
            "title", "media_type", "media_url", "description", "image_file",
        ]

    def clean(self):
        cleaned_data = super().clean()
        media_type = cleaned_data.get("media_type")
        media_url = cleaned_data.get("media_url")
        image_file = cleaned_data.get("image_file")

        if media_type == "image" and not media_url and not image_file:
            raise forms.ValidationError(
                "For image media, enter a Media URL or upload an image."
            )
        if media_type == "video" and not media_url:
            raise forms.ValidationError("For video media, enter the video URL.")
        if media_type == "video" and image_file:
            raise forms.ValidationError(
                "Image uploads are only available when Media Type is Image."
            )
        return cleaned_data
