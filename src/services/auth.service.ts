import { RegisterReq, UserData } from "@/lib/models/auth.model";
import { LoginFormValue } from "@/lib/schemas";
import { useUserStore } from "@/stores/user.store";

export const loginUser = async (creds: LoginFormValue) => {
  const loginRes = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(creds),
  });

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
