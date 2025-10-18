"use client";

import { credentialsSchema, LoginFormValue } from "@/lib/schemas";
import { loginUser } from "@/services/auth.service";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const userStore = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(credentialsSchema),
  });

  const onFormSubmit = (value: LoginFormValue) => {
    // userStore.setUser({ username: "bradata", email: value.email });
    toast.success("Logged in successfully!");

    loginUser(value);
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          {...register("email")}
          type="text"
          id="login-password"
          className={`grid border-1 rounded ${
            !errors.email ? "border-green-500" : "border-red-400"
          }`}
        />
        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="login-email">Password</label>
        <input
          {...register("password")}
          className={`grid border-1 rounded ${
            !errors.email ? "border-green-500" : "border-red-400"
          }`}
          type="text"
          id="login-password"
        />
        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
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
