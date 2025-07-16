// app/api/auth/send-otp/route.ts
import nodemailer from "nodemailer";

const otpStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return new Response("Email required", { status: 400 });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 1000 * 60 * 5; // 5 min

  otpStore.set(email, { code, expiresAt });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.GMAIL_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your OTP Code",
    text: `Your login code is: ${code}`,
  });

  return Response.json({ success: true });
}

export { otpStore };
