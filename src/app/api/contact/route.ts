import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "All fields are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if environment variables are set
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error("Missing email configuration");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service not configured",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // HTML email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f6f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #85277F; font-size: 28px; margin: 0; font-weight: 300;">New Contact Form Submission</h1>
            <div style="width: 60px; height: 2px; background-color: #85277F; margin: 10px auto;"></div>
          </div>
          
          <div style="background-color: #f9f6f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #85277F; font-size: 20px; margin: 0 0 15px 0;">Contact Details</h2>
            <p style="margin: 8px 0; color: #333;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #85277F; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0; color: #333;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f9f6f9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #85277F; font-size: 18px; margin: 0 0 15px 0;">Message</h3>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #85277F;">
              <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              This message was sent from the OFYS contact form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the OFYS contact form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
    `;

    // Send email to business
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER, // Send to the business email
      replyTo: email, // Allow direct reply to customer
      subject: `New Contact Form: ${subject}`,
      text: textContent,
      html: htmlContent,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send email. Please try again later.";

    if (error instanceof Error) {
      if (
        error.message.includes("Invalid login") ||
        error.message.includes("EAUTH")
      ) {
        errorMessage =
          "Email service configuration error. Please contact support.";
        console.error(
          "Gmail authentication failed. Check MAIL_USER and MAIL_PASS environment variables."
        );
      } else if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ECONNREFUSED")
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
