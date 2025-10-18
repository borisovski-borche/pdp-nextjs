import { LoginFormValue } from "@/lib/schemas";
import { useUserStore } from "@/stores/user.store";
import Cookies from "js-cookie";

export const loginUser = async (creds: LoginFormValue) => {
  useUserStore.getState().setUser({ username: "MAJKA TI", email: "TATKO TI" });

  Cookies.set(
    "auth-user",
    JSON.stringify({ username: "bradata", email: creds.email }),
    {
      expires: 1,
    }
  );
};
