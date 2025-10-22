"use client";

import { credentialsSchema, LoginFormValue } from "@/lib/schemas";
import { loginUser } from "@/services/auth.service";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(credentialsSchema),
  });

  const onLoginUser = async (value: LoginFormValue) => {
    try {
      await loginUser(value);

      router.push("/devices");
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const onFormSubmit = (value: LoginFormValue) => {
    onLoginUser(value);
  };

  return (
    <form className="grid gap-3 pb-3" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="grid">
        <label htmlFor="login-email">Email</label>
        <input
          {...register("email")}
          type="text"
          id="login-password"
          className={`grid rounded border-2 bg-white p-1 shadow-[3px_3px] shadow-gray-800 ${
            !errors.email ? "border-gray-800" : "border-red-400"
          }`}
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>
      <div className="grid">
        <label htmlFor="login-email">Password</label>
        <input
          {...register("password")}
          className={`grid rounded border-2 bg-white p-1 shadow-[3px_3px] shadow-gray-800 ${
            !errors.email ? "border-gray-800" : "border-red-400"
          }`}
          type="password"
          id="login-password"
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="my-3 w-[100px] cursor-pointer justify-self-center rounded-xl bg-blue-300 p-3 shadow-[5px_5px] shadow-blue-800 transition hover:-translate-y-0.5"
      >
        Submit
      </button>
    </form>
  );
}
