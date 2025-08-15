import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Extract form fields
    const formData = await req.formData();
    const data = {};

    formData.forEach((value, key) => {
      if (key === "schedule") {
        data[key] = value.split(", ").map((date) => new Date(date).toLocaleDateString());
      } else if (key === "artistName") {
        data["artist"] = { name: value };
      } else {
        data[key] = value;
      }
    });

    // Map bodyPositionImage to bodyPosition for email template
    data.bodyPosition = data.bodyPositionImage || "Not provided";

    // Handle file uploads
    const tattooImage = formData.get("tattooImage");

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
              <span class="field-value">${data.fullName || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Phone Number:</span>
              <span class="field-value">${data.phoneNumber || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Email:</span>
              <span class="field-value">${data.email || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Instagram:</span>
              <span class="field-value">${data.instagram || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Age:</span>
              <span class="field-value">${data.age || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Gender:</span>
              <span class="field-value">${data.gender || "Not provided"}</span>
            </div>
            <h2>Tattoo Details</h2>
            <div class="field">
              <span class="field-label">Body Position:</span>
              <span class="field-value">${data.bodyPosition || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Size:</span>
              <span class="field-value">${data.size || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Color:</span>
              <span class="field-value">${data.color || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Description:</span>
              <span class="field-value">${data.tattooDescription || "Not provided"}</span>
            </div>
            <h2>Appointment Details</h2>
            <div class="field">
              <span class="field-label">Location:</span>
              <span class="field-value">${data.location || "Not provided"}</span>
            </div>
            <div class="field">
              <span class="field-label">Preferred Dates:</span>
              <span class="field-value">${data.schedule ? data.schedule.join(", ") : "Not specified"}</span>
            </div>
            <div class="field">
              <span class="field-label">Artist:</span>
              <span class="field-value">${data.artist ? data.artist.name : "Not selected"}</span>
            </div>
            <div class="field">
              <span class="field-label">Schedule Type:</span>
              <span class="field-value">${data.scheduleType || "Not provided"}</span>
            </div>
            <div class="attachments">
              <h3>Attachments</h3>
              <p>${tattooImage ? "Tattoo Image attached" : "No tattoo image"}</p>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing Panda Tattoo!</p>
            <p><a href="https://pandatattoo.com">Visit our website</a> | <a href="mailto:${process.env.RECIPIENT_EMAIL}">Contact Us</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "yourshopemail@example.com",
      subject: "New Tattoo Booking Request",
      html: htmlContent,
      attachments: [
        tattooImage
          ? { filename: tattooImage.name, content: Buffer.from(await tattooImage.arrayBuffer()) }
          : null,
      ].filter((attachment) => attachment !== null),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}