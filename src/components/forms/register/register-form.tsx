"use client";

import { registerSchema } from "@/lib/schemas";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const user = useUserStore(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  console.log(user?.username);

  return (
    <form
      className="grid gap-3"
      onSubmit={handleSubmit(value => console.log(value))}
    >
      <div className="grid">
        <label htmlFor="register-username">Username</label>
        <input
          {...register("username")}
          type="text"
          id="register-username"
          className={`grid border-1 rounded ${
            !errors.username ? "border-green-500" : "border-red-400"
          }`}
        />
        {errors.username && (
          <p className="text-red-400">{errors.username.message}</p>
        )}
      </div>
      <div className="grid">
        <label htmlFor="register-email">Email</label>
        <input
          {...register("email")}
          type="text"
          id="register-email"
          className={`grid border-1 rounded ${
            !errors.email ? "border-green-500" : "border-red-400"
          }`}
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>
      <div className="grid">
        <label htmlFor="register-password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="register-password"
          className={`grid border-1 rounded ${
            !errors.password ? "border-green-500" : "border-red-400"
          }`}
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
      </div>
      <div className="grid">
        <label htmlFor="register-confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="register-confirmPassword"
          className={`grid border-1 rounded ${
            !errors.confirmPassword ? "border-green-500" : "border-red-400"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="border-1 border-green-500 p-2 rounded justify-self-center"
      >
        Submit
      </button>
    </form>
  );
}
