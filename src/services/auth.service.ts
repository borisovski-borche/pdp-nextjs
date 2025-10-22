import { ChangePassReq, RegisterReq, UserData } from "@/lib/models/auth.model";
import { LoginFormValue } from "@/lib/schemas";
import { useUserStore } from "@/stores/user.store";
import Cookies from "js-cookie";

export const loginUser = async (creds: LoginFormValue) => {
  const loginRes = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(creds),
  });

  if (!loginRes.ok) {
    const { error } = await loginRes.json();

    throw error;
  }

  const user: UserData = await loginRes.json();

  useUserStore.getState().setUser(user);
};

export const registerUser = async (reqBody: RegisterReq) => {
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(reqBody),
  });

  const data = await res.json();

  return data;
};

export const changeUserPassword = async (reqBody: ChangePassReq) => {
  const res = await fetch("/api/change-password", {
    method: "POST",
    body: JSON.stringify(reqBody),
  });

  if (!res.ok) {
    const body = await res.json();

    throw body.error;
  }
};

export const logout = () => {
  Cookies.remove("auth-user");
  useUserStore.persist.clearStorage();
};
