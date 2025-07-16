"use client";

import { useState } from "react";

const OtpAuthPlayground = () => {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!res || !res.ok) {
      setError("Failed to send OTP");
      //   alert(error);
      return;
    }
    // alert("Email sent!");
    setStep("otp");
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) {
      setError("Invalid or expired code");
      //   alert(error);
      return;
    }
    alert("succesfull");
    setStep("done");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">🔐 OTP Login</h1>

      {step === "email" && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded">
            Send OTP
          </button>
        </>
      )}
      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full p-2 border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded">
            Verify OTP
          </button>
        </>
      )}
      {step === "done" && (
        <div className="text-green-700 font-semibold">
          ✅ Logged in as {email}
        </div>
      )}
    </div>
  );
};

export default OtpAuthPlayground;
