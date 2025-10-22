"use client";

import { changePassSchema, ChangePasswordValue } from "@/lib/schemas";
import { changeUserPassword, logout } from "@/services/auth.service";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePassSchema),
  });

  const router = useRouter();

  const user = useUserStore(s => s.user);

  const onChangePassSubmit = async (value: ChangePasswordValue) => {
    try {
      await changeUserPassword({
        newPassword: value.newPassword,
        oldPassword: value.oldPassword,
        userId: user?.id as string,
      });

      logout();
      router.push("/login");
      toast.success(
        "Password changed successfully, please login with your new password"
      );
    } catch (error: any) {
      toast.error(error);
    }
  };

  const onFormSubmit = (value: ChangePasswordValue) => {
    onChangePassSubmit(value);
  };

  return (
    <form className="grid gap-3 pb-3" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="grid">
        <label htmlFor="change-oldPassword">Old Password</label>
        <input
          {...register("oldPassword")}
          type="password"
          id="change-oldPassword"
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.oldPassword ? "border-gray-800" : "border-red-400"
          }`}
        />
        {errors.oldPassword && (
          <p className="text-red-400">{errors.oldPassword.message}</p>
        )}
      </div>
      <div className="grid">
        <label htmlFor="change-newPassword">New Password</label>
        <input
          {...register("newPassword")}
          type="password"
          id="change-newPassword"
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.newPassword ? "border-gray-800" : "border-red-400"
          }`}
        />
        {errors.newPassword && (
          <p className="text-red-400">{errors.newPassword.message}</p>
        )}
      </div>
      <div className="grid">
        <label htmlFor="change-confirmPassword">Confirm New Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="change-confirmPassword"
          className={`bg-white shadow-gray-800 shadow-[3px_3px] p-1 grid border-2 rounded ${
            !errors.confirmPassword ? "border-gray-800" : "border-red-400"
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
