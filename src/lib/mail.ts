import nodemailer from "nodemailer";
import { ContactSubmission } from "./db";

export interface MailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends notification email to the admin/recruiter when a contact form is submitted.
 */
export async function sendContactNotificationEmail(
  contact: ContactSubmission
): Promise<MailResult> {
  const transporter = getTransporter();
  const recipient =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    "admin@cornerstone.com";

  if (!transporter) {
    console.warn(
      "[SMTP Notification Skipped] SMTP configuration is missing in .env. Contact was saved to database."
    );
    return {
      success: false,
      error: "SMTP credentials not configured. Submission saved in database only.",
    };
  }

  const fromEmail =
    process.env.SMTP_FROM || `"Cornerstone Inquiries" <${process.env.SMTP_USER}>`;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
      .header { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 30px; border-bottom: 2px solid #6366f1; }
      .title { color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 6px 0; }
      .subtitle { color: #94a3b8; font-size: 14px; margin: 0; }
      .badge { display: inline-block; background: #312e81; color: #a5b4fc; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; margin-top: 10px; }
      .content { padding: 30px; }
      .table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
      .table td { padding: 12px 14px; border-bottom: 1px solid #1f2937; font-size: 14px; }
      .table td.label { width: 35%; color: #94a3b8; font-weight: 600; }
      .table td.value { color: #f8fafc; font-weight: 500; }
      .comments-box { background: #1e293b; border-left: 4px solid #6366f1; padding: 16px; border-radius: 4px; margin-top: 15px; color: #e2e8f0; font-size: 14px; line-height: 1.6; }
      .footer { background: #0f172a; padding: 20px 30px; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #64748b; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="title">New Enterprise Inquiry</h1>
        <p class="subtitle">Cornerstone Global Advisory Platform</p>
        <div class="badge">Practice: ${contact.practice.toUpperCase()}</div>
      </div>
      <div class="content">
        <table class="table">
          <tr>
            <td class="label">Full Name</td>
            <td class="value"><strong>${contact.name}</strong></td>
          </tr>
          <tr>
            <td class="label">Business Email</td>
            <td class="value"><a href="mailto:${contact.email}" style="color: #818cf8;">${contact.email}</a></td>
          </tr>
          <tr>
            <td class="label">Organization / Company</td>
            <td class="value">${contact.company}</td>
          </tr>
          ${contact.role ? `<tr><td class="label">Title / Role</td><td class="value">${contact.role}</td></tr>` : ""}
          <tr>
            <td class="label">Location</td>
            <td class="value">${contact.city}, ${contact.country}</td>
          </tr>
          ${contact.phone ? `<tr><td class="label">Direct Phone</td><td class="value">${contact.phone}</td></tr>` : ""}
          <tr>
            <td class="label">Received At</td>
            <td class="value">${new Date(contact.createdAt).toLocaleString()}</td>
          </tr>
        </table>

        <div style="font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">
          Project Scope &amp; Priorities:
        </div>
        <div class="comments-box">
          ${contact.comments.replace(/\n/g, "<br/>")}
        </div>
      </div>
      <div class="footer">
        Cornerstone Enterprise Platform • Automatic Consultation Dispatch
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: recipient,
      replyTo: contact.email,
      subject: `[New Inquiry] ${contact.name} - ${contact.company} (${contact.practice})`,
      text: `New consultation inquiry from ${contact.name} (${contact.email}) at ${contact.company}.\nPhone: ${contact.phone || "N/A"}\nPractice: ${contact.practice}\n\nProject Scope:\n${contact.comments}`,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[SMTP Error] Failed to send email:", errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

/**
 * Sends confirmation acknowledgment to the client who submitted the form.
 */
export async function sendContactAcknowledgmentEmail(
  contact: ContactSubmission
): Promise<MailResult> {
  const transporter = getTransporter();
  if (!transporter) {
    return { success: false, error: "SMTP not configured" };
  }

  const fromEmail =
    process.env.SMTP_FROM || `"Cornerstone Advisory" <${process.env.SMTP_USER}>`;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: -apple-system, sans-serif; background-color: #0b1120; color: #f1f5f9; padding: 20px;">
    <div style="max-width: 580px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 30px;">
      <h2 style="color: #ffffff; margin-top: 0;">Thank You for Connecting with Cornerstone</h2>
      <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
        Dear ${contact.name},
      </p>
      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
        We have received your consultation inquiry regarding <strong>${contact.company}</strong> in our <strong>${contact.practice}</strong> practice.
      </p>
      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
        Under our 24-hour enterprise response commitment, one of our practice leads will review your objectives and reach out to schedule a preliminary confidential discussion.
      </p>
      <hr style="border: 0; border-top: 1px solid #1f2937; margin: 25px 0;" />
      <p style="color: #64748b; font-size: 12px; margin: 0;">
        Cornerstone Global Advisory &bull; Confidential &bull; All Rights Reserved.
      </p>
    </div>
  </body>
  </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: contact.email,
      subject: `We've Received Your Inquiry - Cornerstone Enterprise Advisory`,
      html: htmlContent,
    });
    return { success: true, messageId: info.messageId };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

