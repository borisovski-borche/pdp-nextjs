"use client";

import { RegisterReq } from "@/lib/models/auth.model";
import { RegisterFormValue, registerSchema } from "@/lib/schemas";
import { registerUser } from "@/services/auth.service";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();
  const user = useUserStore(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  console.log(user?.username);

  const onUserRegister = async (req: RegisterReq) => {
    const res: { msg: string } = await registerUser(req);
    router.push("/login");
    toast.success(res.msg);
  };

  const onFormSubmit = (value: RegisterFormValue) => {
    onUserRegister(value);
  };

  return (
    <form className="grid gap-3 pb-3" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="grid">
        <label htmlFor="register-username">Username</label>
        <input
          {...register("username")}
          type="text"
          id="register-username"
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.email ? "border-gray-800" : "border-red-400"
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
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.email ? "border-gray-800" : "border-red-400"
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
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.email ? "border-gray-800" : "border-red-400"
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
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.email ? "border-gray-800" : "border-red-400"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-400">{errors.confirmPassword.message}</p>
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
