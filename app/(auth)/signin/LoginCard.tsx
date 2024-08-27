"use client";
import Link from "next/link";
import React, { useState } from "react";

interface LoginCardProps {}
const LoginCard: React.FC<LoginCardProps> = () => {
  const [otpSent, setOtpSent] = useState(false);
  
  return (
    <form>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            className="form-input w-full"
            type="email"
            autoFocus={!otpSent}
          />
        </div>
        {otpSent ? (
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Enter OTP
            </label>
            <input
              id="password"
              className="form-input w-full"
              type="password"
              autoComplete="on"
              autoFocus={otpSent}
            />
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center mt-6">
        {/* <div className="mr-1">
          <Link
            className="text-sm underline hover:no-underline"
            href="/reset-password"
          >
            Forgot Password?
          </Link>
        </div> */}
        <Link
          className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
          href="/"
          onClick={() => {
            setOtpSent(true);
          }}
        >
          {otpSent ? "Verify" : "Send"} OTP
        </Link>
      </div>
    </form>
  );
};
export default LoginCard;
