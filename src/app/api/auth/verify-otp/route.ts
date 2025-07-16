// app/api/auth/verify-otp/route.ts
import { otpStore } from "../send-otp/route";

export async function POST(req: Request) {
  const { email, code } = await req.json();
  const entry = otpStore.get(email);

  if (!entry || entry.code !== code) {
    return new Response("Invalid code", { status: 400 });
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email);
    return new Response("Code expired", { status: 400 });
  }

  // Mark user as "logged in" (temporary in-memory example)
  otpStore.delete(email); // clear OTP

  return Response.json({ success: true, email });
}
