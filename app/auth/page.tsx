"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router
import { InputField } from "@/components/ui/InputField/InputField";
import { OtpInput } from "@/components/ui/OtpInput/OtpInput";
import { Button } from "@heroui/button";
import { validateOtp, validatePhone } from "@/lib/validationSchemas";
import axios from "axios";

const generateRandomOTP = (length = 4) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

export default function AuthPage() {
  const requestURL = "https://randomuser.me/api/?results=1&nat=us";
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState({ phone: "", otp: "", general: "" });
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    const { success, error } = validatePhone(phone);
    if (!success) {
      setErrors((e) => ({ ...e, phone: error }));
      return;
    }
    setErrors((e) => ({ ...e, phone: "", general: "" }));

    const newOtp = generateRandomOTP(4);
    setGeneratedOtp(newOtp);
    alert(`کد OTP شما: ${newOtp}`);
    setCountdown(60);
    setOtp("");
  };

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const validateOtpOnBlur = (isValid: boolean) => {
    if (!isValid) {
      setErrors((e) => ({ ...e }));
    } else {
      setErrors((e) => ({ ...e, otp: "" }));
    }
  };

  const loginHandler = async () => {
    const phoneValidation = validatePhone(phone);
    const otpValidation = validateOtp(otp);

    if (!phoneValidation.success || !otpValidation.success) {
      setErrors({
        phone: phoneValidation.error,
        otp: otpValidation.error,
        general: "",
      });
      return;
    }

    if (otp !== generatedOtp) {
      setErrors((e) => ({ ...e, general: "کد OTP اشتباه است" }));
      return;
    }

    setErrors({ phone: "", otp: "", general: "" });
    setLoading(true);

    try {
      const res = await axios.get(requestURL!);
      const user = res.data.results[0];

      localStorage.setItem("authUser", JSON.stringify(user));
      router.push("/dashboard");
    } catch (error) {
      setErrors((e) => ({
        ...e,
        general: "مشکلی در ورود پیش آمده. لطفا دوباره تلاش کنید.",
      }));
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-500 w-full h-[100vh] flex justify-center items-center">
      <div
        className="bg-white rounded-lg p-8 flex flex-col gap-4 items-center"
        style={{ width: 320 }}
      >
        <h1 className="text-black font-bold text-2xl mb-4">Welcome Back</h1>

        <InputField
          label="شماره تماس"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          placeholder="09xxxxxxxxx"
          disabled={loading}
        />

        <Button
          variant="bordered"
          color="success"
          onPress={handleSendCode}
          isDisabled={countdown > 0 || loading}
          style={{ alignSelf: "stretch" }}
        >
          {countdown > 0 ? `${countdown} ثانیه` : "ارسال کد"}
        </Button>

        <OtpInput
          length={4}
          value={otp}
          onChange={setOtp}
          onBlurValidate={validateOtpOnBlur}
          error={errors.otp}
        />

        {errors.general && (
          <p style={{ color: "red", marginTop: 8 }}>{errors.general}</p>
        )}

        <Button
          variant="shadow"
          color="success"
          onPress={loginHandler}
          isDisabled={loading}
          style={{ alignSelf: "stretch" }}
        >
          {loading ? "در حال ورود..." : "تایید و ادامه"}
        </Button>
      </div>
    </div>
  );
}
