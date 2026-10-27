import mimetypes
import os

from supabase import create_client


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
BUCKET_NAME = os.getenv("SUPABASE_BUCKET", "ngo-media")


def get_supabase_client():
    """Create the client when needed, so missing environment settings fail clearly."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError(
            "Supabase Storage is not configured. Set SUPABASE_URL and SUPABASE_KEY in backend/.env."
        )
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def upload_image(uploaded_file, file_name):
    """Upload an already-validated image and return its public URL."""
    client = get_supabase_client()
    content_type = mimetypes.guess_type(file_name)[0] or "application/octet-stream"
    uploaded_file.seek(0)
    file_content = uploaded_file.read()

    client.storage.from_(BUCKET_NAME).upload(
        path=file_name,
        file=file_content,
        file_options={"content-type": content_type, "upsert": "false"},
    )
    return client.storage.from_(BUCKET_NAME).get_public_url(file_name)


# Compatibility alias for the earlier connection check.
supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
