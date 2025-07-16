"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function AuthPlayground() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  if (session) {
    console.log(session.user);
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Welcome, {session.user?.name}</h1>
        <p>Email: {session.user?.email}</p>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="profile image"
            width={900}
            height={900}
            className="w-16 h-16 rounded-full"
          />
        )}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 space-x-2.5">
      <h1 className="text-xl font-bold">Login Options</h1>

      {/* Email login */}
      <div className="space-y-2 space-x-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded w-full max-w-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => signIn("email", { email })}
          className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
          Send login link
        </button>
      </div>

      {/* Social logins */}
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
        Sign in with Google
      </button>
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer">
        Sign in with GitHub
      </button>
      <button
        onClick={() => signIn("facebook")}
        className="px-4 py-2 bg-blue-700 text-white rounded cursor-pointer">
        Sign in with Facebook
      </button>
    </div>
  );
}
