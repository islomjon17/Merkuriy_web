import logging
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

from django.conf import settings
from django.core.mail import send_mail
from django.db import close_old_connections
from django.template.loader import render_to_string
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)

# Global ThreadPoolExecutor singleton for lean, zero-overhead background task dispatching
_executor = ThreadPoolExecutor(max_workers=3, thread_name_prefix="merkuriy_async_worker")


def send_lead_email(lead_id: int):
    """
    Sends an immediate email notification regarding a new customer inquiry
    to the company inbox using Django's SMTP backend.
    """
    close_old_connections()
    try:
        from .models import Lead
        lead = Lead.objects.filter(id=lead_id).first()
        if not lead:
            logger.warning(f"[Lead Email] Lead with ID={lead_id} not found.")
            return

        subject = "[Merkuriy-R] Yangi mijoz arizasi"
        recipients = getattr(settings, 'NOTIFY_EMAIL_RECIPIENTS', ['info@merkuriy-r.uz'])
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@merkuriy-r.uz')

        created_str = lead.created_at.strftime('%Y-%m-%d %H:%M:%S')

        # Plain text content
        plain_message = (
            f"Assalomu alaykum,\n\n"
            f"Merkuriy-R vebsaytidan yangi mijoz arizasi kelib tushdi:\n\n"
            f"- Mijoz ismi: {lead.name}\n"
            f"- Telefon raqami: {lead.phone_number}\n"
            f"- Qiziqayotgan xizmat/loyiha: {lead.project_type or 'Ko\'rsatilmagan'}\n"
            f"- Kelib tushgan vaqti: {created_str}\n"
            f"- Holati: {lead.get_status_display()}\n\n"
            f"Iltimos, mijoz bilan imkon qadar tezroq bog'laning.\n"
            f"Merkuriy-R Xususiy qurilish firmasi Boshqaruv tizimi"
        )

        # HTML content
        html_message = f"""
        <!DOCTYPE html>
        <html lang="uz">
        <head>
            <meta charset="UTF-8">
            <style>
                body {{ font-family: Arial, sans-serif; color: #222; background-color: #f4f6f9; padding: 20px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }}
                .header {{ background-color: #1e3a8a; color: #ffffff; padding: 24px; text-align: center; }}
                .header h1 {{ margin: 0; font-size: 20px; font-weight: 600; }}
                .content {{ padding: 28px; }}
                .info-table {{ width: 100%; border-collapse: collapse; margin-top: 16px; }}
                .info-table td {{ padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 15px; }}
                .info-table td.label {{ font-weight: 600; color: #4a5568; width: 38%; }}
                .footer {{ background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; }}
                .badge {{ display: inline-block; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 4px; background: #ebf8ff; color: #2b6cb0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>[Merkuriy-R] Yangi mijoz arizasi</h1>
                </div>
                <div class="content">
                    <p>Hurmatli menejer, vebsayt orqali yangi mijoz murojaati qabul qilindi:</p>
                    <table class="info-table">
                        <tr>
                            <td class="label">Mijoz ismi:</td>
                            <td><strong>{lead.name}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Telefon raqami:</td>
                            <td><a href="tel:{lead.phone_number}" style="color: #2b6cb0; text-decoration: none; font-weight: 600;">{lead.phone_number}</a></td>
                        </tr>
                        <tr>
                            <td class="label">Xizmat / Loyiha turi:</td>
                            <td>{lead.project_type or "Ko'rsatilmagan"}</td>
                        </tr>
                        <tr>
                            <td class="label">Kelib tushgan vaqti:</td>
                            <td>{created_str}</td>
                        </tr>
                        <tr>
                            <td class="label">Boshlang'ich holat:</td>
                            <td><span class="badge">{lead.get_status_display()}</span></td>
                        </tr>
                    </table>
                </div>
                <div class="footer">
                    &copy; Merkuriy-R Xususiy qurilish firmasi Boshqaruvi
                </div>
            </div>
        </body>
        </html>
        """

        send_mail(
            subject=subject,
            message=plain_message,
            from_email=from_email,
            recipient_list=recipients,
            html_message=html_message,
            fail_silently=False,
        )
        logger.info(f"[Lead Email] Notification for Lead #{lead_id} successfully dispatched to {recipients}.")
    except Exception as exc:
        logger.exception(f"[Lead Email Error] Failed to send email for Lead #{lead_id}: {exc}")
    finally:
        close_old_connections()


def sync_lead_to_sheets(lead_id: int):
    """
    Appends a new lead record to the company's designated Google Sheet using
    a Google Cloud Service Account.
    Row format: [Created Date, Name, Phone Number, Project/Service, Status]
    """
    close_old_connections()
    try:
        from .models import Lead
        lead = Lead.objects.filter(id=lead_id).first()
        if not lead:
            logger.warning(f"[Google Sheets Sync] Lead with ID={lead_id} not found.")
            return

        service_account_file = getattr(settings, 'GOOGLE_SERVICE_ACCOUNT_FILE', None)
        sheet_key = getattr(settings, 'GOOGLE_SHEET_KEY', None)

        if not service_account_file or not sheet_key:
            logger.info(
                f"[Google Sheets Sync] GOOGLE_SERVICE_ACCOUNT_FILE or GOOGLE_SHEET_KEY not configured. "
                f"Skipping sheets sync for Lead #{lead_id}."
            )
            return

        cred_path = Path(service_account_file)
        if not cred_path.is_absolute():
            cred_path = settings.BASE_DIR / cred_path

        if not cred_path.exists():
            logger.info(
                f"[Google Sheets Sync] Credentials file '{cred_path}' does not exist on disk. "
                f"Skipping sheets sync for Lead #{lead_id}."
            )
            return

        import gspread
        gc = gspread.service_account(filename=str(cred_path))
        sheet = gc.open_by_key(sheet_key)
        worksheet = sheet.sheet1

        created_str = lead.created_at.strftime('%Y-%m-%d %H:%M:%S')
        row = [
            created_str,
            lead.name,
            lead.phone_number,
            lead.project_type or '-',
            lead.get_status_display(),
        ]

        worksheet.append_row(row)
        logger.info(f"[Google Sheets Sync] Lead #{lead_id} successfully synced to Google Sheet.")
    except Exception as exc:
        logger.exception(f"[Google Sheets Sync Error] Failed to sync Lead #{lead_id}: {exc}")
    finally:
        close_old_connections()


def dispatch_lead_background_tasks(lead_id: int):
    """
    Submits email notification and Google Sheets synchronization to the
    ThreadPoolExecutor background worker queue.
    This call returns immediately, preventing network I/O from blocking the HTTP response.
    """
    try:
        _executor.submit(send_lead_email, lead_id)
        _executor.submit(sync_lead_to_sheets, lead_id)
        logger.info(f"[Task Dispatcher] Background tasks for Lead #{lead_id} enqueued successfully.")
    except Exception as exc:
        logger.exception(f"[Task Dispatcher Error] Failed to enqueue background tasks for Lead #{lead_id}: {exc}")
