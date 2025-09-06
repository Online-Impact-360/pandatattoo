import { createFormSubmissionEntry } from "@/app/lib/createFormSubmission";
import { sanitizeSubmission } from "@/app/lib/sanitize";
import { SubmissionSchema } from "@/app/lib/validation";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Extract form fields
    const formData = await req.formData();
    const data = {};
    let tattooImage = null;

    for (const [key, value] of formData.entries()) {
      if (key === "tattooImage") {
        tattooImage = value; // Store file separately
      } else if (key === "schedule") {
        data.availableDates = value.split(", "); // Split into array for Contentful
        data.schedule = value; // Keep as string for schedule field
      } else {
        data[key] = value;
      }
    }

    // Validate and sanitize data
    const validatedData = SubmissionSchema.parse(data);
    const sanitizedData = sanitizeSubmission(validatedData);

    // Create Contentful entry
    const { id: entryId } = await createFormSubmissionEntry(sanitizedData, tattooImage);

    // Map fields for email template, aligning with sanitizedData
    const emailData = {
      fullName: sanitizedData.fullName || "Not provided",
      phoneNumber: sanitizedData.phoneNumber || "Not provided",
      email: sanitizedData.email || "Not provided",
      instagram: sanitizedData.instagram || "Not provided",
      ageType: sanitizedData.ageType || "Not provided",
      gender: sanitizedData.gender || "Not provided",
      bodyPosition: sanitizedData.bodyPosition || sanitizedData.bodyPositionImage || "Not provided",
      selectedPosition: sanitizedData.selectedPosition || "Not provided",
      size: sanitizedData.size || "Not provided",
      colorType: sanitizedData.colorType || "Not provided",
      tattooDescription: sanitizedData.tattooDescription || "Not provided",
      availableDates: sanitizedData.availableDates?.join(", ") || "Not provided",
      schedule: sanitizedData.schedule || "Not provided",
      miamiStatus: sanitizedData.miamiStatus || "Not provided",
      artistId: sanitizedData.artistId ? "Selected (ID: " + sanitizedData.artistId + ")" : "Not selected",
    };

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify().catch((error) => {
      throw new Error(`Email transporter configuration error: ${error.message}`);
    });

    // Prepare attachment
    let attachments = [];
    if (tattooImage) {
      try {
        const arrayBuffer = await tattooImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        attachments.push({
          filename: tattooImage.name,
          content: buffer,
          contentType: tattooImage.type,
        });
      } catch (error) {
        console.warn("Failed to prepare attachment, proceeding without it:", {
          message: error.message,
          stack: error.stack,
        });
      }
    }

    // HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Tattoo Booking Request</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .header { background: #1a1a1a; color: #ffffff; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 20px; }
          .content h2 { color: #1a1a1a; font-size: 20px; margin-top: 0; }
          .content p { color: #333; line-height: 1.6; margin: 10px 0; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #1a1a1a; }
          .field-value { color: #555; }
          .attachments { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; }
          .footer { background: #1a1a1a; color: #ffffff; text-align: center; padding: 10px; font-size: 12px; }
          .footer a { color: #ffffff; text-decoration: underline; }
          @media (max-width: 600px) {
            .container { margin: 10px; }
            .header h1 { font-size: 20px; }
            .content { padding: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Tattoo Booking Request</h1>
          </div>
          <div class="content">
            <h2>Client Details</h2>
            <div class="field">
              <span class="field-label">Full Name:</span>
              <span class="field-value">${emailData.fullName}</span>
            </div>
            <div class="field">
              <span class="field-label">Phone Number:</span>
              <span class="field-value">${emailData.phoneNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Email:</span>
              <span class="field-value">${emailData.email}</span>
            </div>
            <div class="field">
              <span class="field-label">Instagram:</span>
              <span class="field-value">${emailData.instagram}</span>
            </div>
            <div class="field">
              <span class="field-label">Age Type:</span>
              <span class="field-value">${emailData.ageType}</span>
            </div>
            <div class="field">
              <span class="field-label">Gender:</span>
              <span class="field-value">${emailData.gender}</span>
            </div>
            <h2>Tattoo Details</h2>
            <div class="field">
              <span class="field-label">Body Position:</span>
              <span class="field-value">${emailData.bodyPosition}</span>
            </div>
            <div class="field">
              <span class="field-label">Selected Position:</span>
              <span class="field-value">${emailData.selectedPosition}</span>
            </div>
            <div class="field">
              <span class="field-label">Size:</span>
              <span class="field-value">${emailData.size}</span>
            </div>
            <div class="field">
              <span class="field-label">Color Type:</span>
              <span class="field-value">${emailData.colorType}</span>
            </div>
            <div class="field">
              <span class="field-label">Description:</span>
              <span class="field-value">${emailData.tattooDescription}</span>
            </div>
            <h2>Appointment Details</h2>
            <div class="field">
              <span class="field-label">Location:</span>
              <span class="field-value">${emailData.miamiStatus}</span>
            </div>
            <div class="field">
              <span class="field-label">Preferred Dates:</span>
              <span class="field-value">${emailData.availableDates}</span>
            </div>
            <div class="field">
              <span class="field-label">Schedule:</span>
              <span class="field-value">${emailData.schedule}</span>
            </div>
            <div class="field">
              <span class="field-label">Artist:</span>
              <span class="field-value">${emailData.artistId}</span>
            </div>
            <div class="attachments">
              <h3>Attachments</h3>
              <p>${tattooImage ? "Tattoo Image attached" : "No tattoo image"}</p>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing Panda Tattoo!</p>
            <p><a href="https://pandatattoo.com">Visit our website</a> | <a href="mailto:${process.env.RECIPIENT_EMAIL || "bookings@tattoopanda.com"}">Contact Us</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "no-reply@pandatattoo.com",
      to: process.env.RECIPIENT_EMAIL || "bookings@tattoopanda.com",
      subject: "New Tattoo Booking Request",
      html: htmlContent,
      attachments,
    };


    await transporter.sendMail(mailOptions).catch((error) => {
      throw new Error(`Failed to send email: ${error.message}`);
    });

    return NextResponse.json({ success: true, message: "Form submitted and email sent successfully", entryId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: `Failed to process form submission: ${error.message}` }, { status: 500 });
  }
}