import { NextResponse } from "next/server";
import { db, ContactSubmission } from "@/lib/db";
import { sendContactNotificationEmail, sendContactAcknowledgmentEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, role, country, city, phone, practice, comments } = body;

    // Strict Server-Side Validation
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      errors.email = "A valid business email address is required.";
    }

    if (!company || typeof company !== "string" || company.trim().length < 2) {
      errors.company = "Company / Organization name is required.";
    }

    if (!country || typeof country !== "string" || country.trim().length < 2) {
      errors.country = "Country is required.";
    }

    if (!city || typeof city !== "string" || city.trim().length < 2) {
      errors.city = "City is required.";
    }

    if (!practice || typeof practice !== "string") {
      errors.practice = "Please select a primary practice service.";
    }

    if (!comments || typeof comments !== "string" || comments.trim().length < 10) {
      errors.comments = "Project scope must be at least 10 characters long.";
    }

    if (phone && typeof phone === "string" && phone.trim().length > 0) {
      const cleanPhone = phone.replace(/[\s()-]/g, "");
      if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        errors.phone = "Please enter a valid telephone number.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed. Please review the highlighted fields.",
          details: errors,
        },
        { status: 400 }
      );
    }

    const newContact: ContactSubmission = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      role: role ? String(role).trim() : undefined,
      country: country.trim(),
      city: city.trim(),
      phone: phone ? String(phone).trim() : undefined,
      practice: String(practice),
      comments: comments.trim(),
      status: "new",
      emailSent: false,
      createdAt: new Date().toISOString(),
    };

    // 1. Always save to database first
    db.createContact(newContact);

    // 2. Dispatch SMTP Notification
    let mailSent = false;
    try {
      const mailResult = await sendContactNotificationEmail(newContact);
      if (mailResult.success) {
        mailSent = true;
        newContact.emailSent = true;
        // Optionally send acknowledgment to the user
        sendContactAcknowledgmentEmail(newContact).catch((e) =>
          console.error("Acknowledgment email error:", e)
        );
      } else {
        console.warn("[Contact API] Mail notification could not be dispatched:", mailResult.error);
      }
    } catch (mailErr) {
      console.error("[Contact API] SMTP error:", mailErr);
    }

    return NextResponse.json(
      {
        message: "Your inquiry has been successfully received and logged.",
        id: newContact.id,
        emailDispatched: mailSent,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error while processing your inquiry." },
      { status: 500 }
    );
  }
}

