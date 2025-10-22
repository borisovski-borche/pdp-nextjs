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
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          {...register("email")}
          type="text"
          id="login-password"
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.email ? "border-gray-800" : "border-red-400"
          }`}
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="login-email">Password</label>
        <input
          {...register("password")}
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
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
        className="justify-self-center w-[100px] shadow-[5px_5px] p-3 my-3 rounded-xl bg-blue-300 cursor-pointer shadow-blue-800 hover:-translate-y-0.5 transition"
      >
        Submit
      </button>
    </form>
  );
}
