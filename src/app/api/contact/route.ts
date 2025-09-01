import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: "youremail@example.com",
    subject: `Contact form from ${name}`,
    text: message,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
