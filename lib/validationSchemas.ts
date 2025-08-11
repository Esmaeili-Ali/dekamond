import { z } from "zod";

const phoneSchema = z.string().regex(/^09\d{9}$/, "شماره تلفن صحیح نیست");

const otpSchema = z
  .string()
  .length(4, "کد باید دقیقا ۴ رقم باشد")
  .regex(/^\d+$/, "کد فقط باید شامل اعداد باشد");

export function validatePhone(phone: string) {
  const result = phoneSchema.safeParse(phone);
  return {
    success: result.success,
    error: result.success ? "" : result.error.issues[0].message,
  };
}

export function validateOtp(otp: string) {
  const result = otpSchema.safeParse(otp);
  return {
    success: result.success,
    error: result.success ? "" : result.error.issues[0].message,
  };
}
