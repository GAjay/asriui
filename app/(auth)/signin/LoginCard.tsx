"use client";
import apiEndpoints from "@/app/constants/apiEndpoints";
import routes from "@/app/constants/routes";
import setCookie from "@/app/utils/setCookie";
import toFormData from "@/app/utils/toFormData";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useFetch } from "use-http";
import * as yup from "yup";
import { useRouter } from "next/navigation";

interface LoginCardProps {}
const LoginCard: React.FC<LoginCardProps> = () => {
  const [otpSent, setOtpSent] = useState(false);
  const { get, post, response, loading, error, data } = useFetch();
  const [errors, setErrors] = useState<any>();
  const [payload, setPayload] = useState<any>({
    email_id: "",
    entity_type: "email",
  });
  const router = useRouter();
  const handleSendOtp = () => {
    const validation = yup.object().shape({
      email: yup.string().required().email(),
    });
    validation
      .isValid({
        email: payload?.email_id,
      })
      .then(function (valid) {
        if (valid) {
          setErrors(null);
          post(apiEndpoints.getOtp, toFormData(payload))
            .then((res) => {
              setOtpSent(true);
            })
            .catch((e) => {
              toast.error("otp sent error");
            });
        } else {
          setErrors("Please enter valid email address");
        }
      });
  };

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
            placeholder="Enter your email address"
            onChange={(e) => {
              setPayload((prev: any) => ({
                ...prev,
                email_id: e?.target?.value?.toLowerCase(),
              }));
            }}
            value={payload?.email_id}
          />
          {errors ? (
            <label
              className="block text-sm font-medium mb-1 text-red-600 my-2 mx-2"
              htmlFor="email"
            >
              {errors}
            </label>
          ) : null}
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
              onChange={(e) => {
                setPayload((prev: any) => ({
                  ...prev,
                  otp: e?.target?.value?.toLowerCase(),
                }));
              }}
              value={payload?.otp}
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
        <button
          className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
          onClick={(e) => {
            e.preventDefault();
            if (otpSent) {
              if (payload?.otp) {
                post(apiEndpoints.verifyOtp, toFormData(payload));
                toast.success("otp verified");
                setCookie("auth", "some session value from api");
                router.replace('/');
              } else {
                toast.error("please enter valid otp");
              }
            } else {
              handleSendOtp();
            }
          }}
        >
          {otpSent ? "Verify" : "Get"} OTP
        </button>
      </div>
    </form>
  );
};
export default LoginCard;
