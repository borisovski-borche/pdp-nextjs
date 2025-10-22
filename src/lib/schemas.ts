import { register } from "module";
import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.email("Please input a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be between 3-30 characters")
      .max(30, "Username must be between 3-30 characters"),
    email: z.email("Email must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must be between 8-30 characters")
      .max(30, "Password must be between 8-30 characters"),
    confirmPassword: z
      .string()
      .min(8, "Cofnrim password must be between 8-30 characters")
      .max(30, "Confirm password must be between 8-30 characters"),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
  });

export const changePassSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Password must be between 8-30 characters")
      .max(30, "Password must be between 8-30 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be between 8-30 characters")
      .max(30, "Password must be between 8-30 characters"),
    confirmPassword: z
      .string()
      .min(8, "Cofnrim password must be between 8-30 characters")
      .max(30, "Confirm password must be between 8-30 characters"),
  })
  .refine(data => data.newPassword !== data.oldPassword, {
    error: "Old password and new password can't be the same",
    path: ["newPassword"],
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    error: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

export type LoginFormValue = z.infer<typeof credentialsSchema>;
export type RegisterFormValue = z.infer<typeof registerSchema>;
export type ChangePasswordValue = z.infer<typeof changePassSchema>;
