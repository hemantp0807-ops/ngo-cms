
from django.db import models
from django.contrib.auth.models import User


class Banner(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=255)
    display_order = models.PositiveIntegerField(default=0)
    status = models.BooleanField(default=True)

    class Meta:
        db_table = 'banners'
        ordering = ['display_order']

    def __str__(self):
        return self.title


class VisionMission(models.Model):
    vision_title = models.CharField(max_length=150)
    vision_description = models.CharField(max_length=200)
    mission_title = models.CharField(max_length=150)
    mission_description = models.CharField(max_length=200)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'vision_mission'

    def __str__(self):
        return f'{self.vision_title} / {self.mission_title}'


class Statistic(models.Model):
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    display_order = models.PositiveIntegerField(default=0)
    status = models.BooleanField(default=True)

    class Meta:
        db_table = 'statistic'
        ordering = ['display_order']

    def __str__(self):
        return f'{self.label}: {self.value}'


class Initiative(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    image_url = models.URLField(max_length=150, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    status = models.BooleanField(default=True)

    class Meta:
        db_table = 'initiatives'
        ordering = ['display_order']

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    location = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )
    image_url = models.URLField(blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class MediaItem(models.Model):
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]

    title = models.CharField(max_length=200)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)
    media_url = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Donation(models.Model):
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
    ]

    donor_name = models.CharField(max_length=150)
    donor_email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(
        max_length=20, choices=PAYMENT_STATUS, default='pending'
    )
    payment_reference = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.donor_name} - {self.amount}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.subject


class VolunteerRegistration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    interests = models.TextField(blank=True)
    availability = models.CharField(max_length=200, blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.full_name
