# MerkuriyRfirma - Backend REST API

Production-ready, lean, lightweight Django REST API backend for **"Merkuriy-R Xususiy qurilish firmasi"**.

Built according to zero-overhead architectural principles:
- **No Docker, No Celery, No Redis**
- **Database**: SQLite3 (`db.sqlite3`) with WAL/timeout concurrency optimization
- **Background Tasks**: Python native `concurrent.futures.ThreadPoolExecutor` for asynchronous email alerts and Google Sheets integration without blocking client HTTP responses.
- **Security & Permissions**: Public read-only endpoints and lead submission; administrative management strictly through Django Admin.

---

## 🛠 Tech Stack

- **Python**: 3.11+
- **Django**: 5.0+
- **Django REST Framework (DRF)**: 3.14+
- **Database**: SQLite3
- **Async Workers**: `concurrent.futures.ThreadPoolExecutor(max_workers=3)`
- **Integrations**: `gspread` + `google-auth` (Google Sheets API)
- **CORS**: `django-cors-headers`
- **Media**: `Pillow`
- **Environment Management**: `python-decouple`

---

## 📁 Project Structure

```
MerkuriyRfirma/
├── manage.py
├── requirements.txt
├── .env.example
├── .env
├── config/
│   ├── __init__.py
│   ├── settings.py         # App settings, DB, CORS, Mail, Google Sheets
│   ├── urls.py             # Admin and API routing
│   └── wsgi.py
└── apps/
    ├── __init__.py
    ├── core/                # Singleton base model, admin & seed_data command
    ├── company/             # SiteConfiguration, ContactInfo, Testimonials
    ├── projects/            # Categories, Projects, Hero slides, Media Gallery
    └── leads/               # Lead model, thread-based async services
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Copy `.env.example` to `.env` and set your configuration:
```bash
cp .env.example .env
```

Key environment variables:
- `SECRET_KEY`: Django secret key
- `DEBUG`: `True` for development, `False` for production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hostnames
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins
- `EMAIL_BACKEND`: `django.core.mail.backends.console.EmailBackend` (for dev) or `django.core.mail.backends.smtp.EmailBackend`
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`: SMTP credentials
- `NOTIFY_EMAIL_RECIPIENTS`: Company inbox(es) to receive notifications
- `GOOGLE_SERVICE_ACCOUNT_FILE`: Path to your Google Cloud service account JSON key
- `GOOGLE_SHEET_KEY`: Target Google Spreadsheet ID

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Seed Initial Data
Populate official company configuration, contacts, project categories, sample projects with gallery, and admin superuser:
```bash
python manage.py seed_data
```

**Default Admin Credentials:**
- **Username**: `admin`
- **Password**: `admin12345`

### 5. Run Development Server
```bash
python manage.py runserver
```

---

## 📡 API Endpoints Reference

### 1. Home & Configuration
- **`GET /api/home/`**
  - Returns unified home payload: company configuration, statistics (years of experience, completed projects, master workers), active promotional banner, client testimonials, and active hero slides.
- **`GET /api/contact/`**
  - Returns phone numbers, email, physical office address, working hours, and social media channels (Telegram, Instagram, Facebook, YouTube).

### 2. Projects & Categories
- **`GET /api/categories/`**
  - Returns all project categories with `projects_count`.
- **`GET /api/projects/`**
  - Lists all projects.
  - **Query Parameters**:
    - `?category=<slug>`: Filter projects by category slug (e.g. `turar-joy`, `tijoriy-binolar`).
    - `?status=<status>`: Filter by `completed` or `in_progress`.
    - `?featured=true`: Filter featured showcase projects.
- **`GET /api/projects/<id>/`**
  - Returns complete project details including media gallery, before/after images, and satellite location link.

### 3. Lead Generation (Async Background Workers)
- **`POST /api/leads/create/`**
  - **Payload**:
    ```json
    {
      "name": "Mijoz Ismi",
      "phone_number": "+998901234567",
      "project_type": "Kottej qurilishi"
    }
    ```
  - **Response (HTTP 201 Created immediately)**:
    ```json
    {
      "status": "success",
      "message": "Arizangiz muvaffaqiyatli qabul qilindi. Tez orada mutaxassisimiz siz bilan bog'lanadi.",
      "lead": {
        "id": 1,
        "name": "Mijoz Ismi",
        "phone_number": "+998901234567",
        "project_type": "Kottej qurilishi",
        "status": "new",
        "status_display": "Yangi",
        "notes": "",
        "created_at": "2026-09-06 20:43:21"
      }
    }
    ```
  - **Background Worker Actions**:
    - Dispatches email notification with subject `[Merkuriy-R] Yangi mijoz arizasi` to `NOTIFY_EMAIL_RECIPIENTS`.
    - Appends row to Google Sheet: `[Created Date, Name, Phone Number, Project/Service, Status]`.
    - Returns HTTP 201 without waiting for external network I/O.

---

## 🧪 Running Automated Tests
```bash
python manage.py test
```
Runs test suite verifying singleton models, API views, filter queries, lead validation, and thread-safe async dispatchers.
