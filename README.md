# NGO CMS

React + Vite frontend and Django REST Framework backend, using Supabase PostgreSQL and Supabase Storage.

## Requirements

- Python 3.11 or newer (use a Python version supported by your installed Django dependencies)
- Node.js and npm
- A Supabase project with PostgreSQL and a Storage bucket named `ngo-media`

## Backend setup (Windows PowerShell)

1. Open a terminal in the project folder.
2. Create and activate a virtual environment:

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. Install backend dependencies:

   ```powershell
   pip install -r backend\requirements.txt
   ```

4. Copy `backend\.env.example` to `backend\.env` and enter your own Supabase database credentials, Project URL, and server-side secret key. Do not put the Supabase secret key in React files or commit `.env` to Git.
5. Start the backend:

   ```powershell
   cd backend
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

6. Open `http://127.0.0.1:8000/admin/`.

If the Supabase database has already been migrated and your admin account already exists, do not create another superuser unless needed.

## Frontend setup

Open a second terminal in the project root:

```powershell
npm install
npm run dev
```

Vite will print the local frontend URL, normally `http://localhost:5173/`.

## Admin image uploads

The Django Admin forms support image uploads to the public `ngo-media` bucket for:

- Banners (`banners/`)
- Initiatives (`initiatives/`)
- Projects (`projects/`)
- Blog posts (`blogs/`)
- Media items (`media/`, when Media Type is Image)

Accepted image extensions: JPG, JPEG, PNG, WEBP. Maximum upload size: 5 MB. The form verifies that uploaded files are readable images. For video media, enter a video URL instead of uploading an image.

The server-side Supabase key is privileged. Keep it in `backend/.env` only, never in frontend code. Before production deployment, set `DEBUG=False`, use a strong `DJANGO_SECRET_KEY`, configure production `ALLOWED_HOSTS`, and review API permissions and payment processing.

## Existing database

This source bundle intentionally excludes `.env`, local SQLite files, virtual environments, and `node_modules`. It does not include your live Supabase data or credentials. Keep a backup of your working project before replacing files.
