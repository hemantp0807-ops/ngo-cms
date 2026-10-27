
from decimal import Decimal, InvalidOperation

from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Project,
    BlogPost,
    MediaItem,
    ContactMessage,
    VolunteerRegistration,
    Donation,
)


def get_required_text(data, fields):
    """Return missing required fields, or an empty list."""
    return [
        field
        for field in fields
        if not isinstance(data.get(field), str)
        or not data.get(field).strip()
    ]


def valid_email(value):
    if not isinstance(value, str):
        return False

    try:
        validate_email(value.strip())
        return True
    except ValidationError:
        return False


@api_view(["GET"])
def home_api(request):
    return Response({
        "message": "NGO CMS Backend is working!",
        "status": "success",
        "project": "NGO CMS",
    })


@api_view(["GET"])
def projects_api(request):
    projects = Project.objects.filter(is_active=True)

    data = [
        {
            "id": project.id,
            "title": project.title,
            "slug": project.slug,
            "description": project.description,
            "location": project.location,
            "start_date": project.start_date,
            "end_date": project.end_date,
            "image_url": project.image_url,
        }
        for project in projects
    ]

    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
def blog_api(request):
    posts = BlogPost.objects.filter(
        is_published=True
    ).select_related("author")

    data = [
        {
            "id": post.id,
            "title": post.title,
            "slug": post.slug,
            "content": post.content,
            "author": post.author.username if post.author else None,
            "image_url": post.image_url,
            "created_at": post.created_at,
        }
        for post in posts
    ]

    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
def media_api(request):
    media_items = MediaItem.objects.all()

    data = [
        {
            "id": item.id,
            "title": item.title,
            "media_type": item.media_type,
            "media_url": item.media_url,
            "description": item.description,
            "created_at": item.created_at,
        }
        for item in media_items
    ]

    return Response(data, status=status.HTTP_200_OK)


@api_view(["POST"])
def contact_api(request):
    # Contact messages can be submitted publicly.
    # Listing private messages is not allowed through this endpoint.
    missing = get_required_text(
        request.data,
        ["name", "email", "subject", "message"],
    )

    if missing:
        return Response(
            {"error": "Name, email, subject and message are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not valid_email(request.data["email"]):
        return Response(
            {"error": "Please provide a valid email address."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    contact_message = ContactMessage.objects.create(
        name=request.data["name"].strip(),
        email=request.data["email"].strip(),
        subject=request.data["subject"].strip(),
        message=request.data["message"].strip(),
    )

    return Response(
        {
            "message": "Contact message submitted successfully.",
            "id": contact_message.id,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def volunteer_api(request):
    missing = get_required_text(
        request.data,
        ["full_name", "email"],
    )

    if missing:
        return Response(
            {"error": "Full name and email are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not valid_email(request.data["email"]):
        return Response(
            {"error": "Please provide a valid email address."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    volunteer = VolunteerRegistration.objects.create(
        full_name=request.data["full_name"].strip(),
        email=request.data["email"].strip(),
        phone=request.data.get("phone", ""),
        interests=request.data.get("interests", ""),
        availability=request.data.get("availability", ""),
    )

    return Response(
        {
            "message": "Volunteer registration submitted successfully.",
            "id": volunteer.id,
            "status": volunteer.status,
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def donation_api(request):
    missing = get_required_text(
        request.data,
        ["donor_name", "donor_email", "amount"],
    )

    if missing:
        return Response(
            {"error": "Donor name, email and amount are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not valid_email(request.data["donor_email"]):
        return Response(
            {"error": "Please provide a valid donor email address."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        amount = Decimal(str(request.data["amount"]).strip())

        if not amount.is_finite() or amount <= 0:
            raise InvalidOperation

        # Reject amounts with more than two decimal places.
        if amount.as_tuple().exponent < -2:
            raise InvalidOperation

    except (InvalidOperation, ValueError, TypeError):
        return Response(
            {
                "error": (
                    "Amount must be a positive number "
                    "with no more than two decimal places."
                )
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    donation = Donation.objects.create(
        donor_name=request.data["donor_name"].strip(),
        donor_email=request.data["donor_email"].strip(),
        amount=amount,
        payment_status="pending",
    )

    return Response(
        {
            "message": (
                "Donation record created. Payment has not been processed."
            ),
            "id": donation.id,
            "payment_status": donation.payment_status,
        },
        status=status.HTTP_201_CREATED,
    )
