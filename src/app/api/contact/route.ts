import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, category, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !category || !subject || !message) {
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

    // Define category-based email routing
    const getEmailForCategory = (category: string): string => {
      const categoryEmails: { [key: string]: string } = {
        Realty: "Realty@ofys.cr",
        Rentals: "Management@ofys.cr",
        Construction: "Construction@ofys.cr",
        "General Inquiry": process.env.MAIL_USER || "info@ofys.cr",
      };

      return (
        categoryEmails[category] || process.env.MAIL_USER || "info@ofys.cr"
      );
    };

    const targetEmail = getEmailForCategory(category);

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
            <p style="margin: 8px 0; color: #333;"><strong>Category for this inquiry:</strong> ${category}</p>
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

    // Send email to business (routed by category)
    await transporter.sendMail({
      from: email,
      to: targetEmail, // Send to category-specific email
      replyTo: email, // Allow direct reply to customer
      subject: `New Contact Form: ${subject}`,
      text: textContent,
      html: htmlContent,
    });

    // Send confirmation email to customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f6f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #85277F; font-size: 28px; margin: 0; font-weight: 300;">Thank You for Contacting OFYS</h1>
            <div style="width: 60px; height: 2px; background-color: #85277F; margin: 10px auto;"></div>
          </div>
          
          <div style="background-color: #f9f6f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Dear ${name},
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Thank you for reaching out to OFYS! We have received your message and will get back to you as soon as possible.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
              Your inquiry is important to us, and we typically respond within 24 hours during business days.
            </p>
          </div>
          
          <div style="background-color: #f9f6f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #85277F; font-size: 18px; margin: 0 0 15px 0;">Your Message Summary</h3>
            <p style="margin: 8px 0; color: #333;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Category:</strong> ${category}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Submitted:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              If you have any urgent questions, please don't hesitate to contact us directly.
            </p>
            <p style="color: #85277F; font-size: 14px; margin: 10px 0 0 0;">
              Best regards,<br>
              The OFYS Team
            </p>
          </div>
        </div>
      </div>
    `;

    const confirmationText = `
Thank You for Contacting OFYS

Dear ${name},

Thank you for reaching out to OFYS! We have received your message and will get back to you as soon as possible.

Your inquiry is important to us, and we typically respond within 24 hours during business days.

Your Message Summary:
Subject: ${subject}
Category: ${category}
Submitted: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

If you have any urgent questions, please don't hesitate to contact us directly.

Best regards,
The OFYS Team
    `;

    await transporter.sendMail({
      from: targetEmail, // Send from business email
      to: email, // Send to customer
      subject: `Thank you for contacting OFYS - ${subject}`,
      text: confirmationText,
      html: confirmationHtml,
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
