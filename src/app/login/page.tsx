import Container from "@/components/common/container/container";
import LoginForm from "@/components/forms/login-form/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2 Portal - Login",
  description: "Login page for the portal",
};

export default function Login() {
  return (
    <Container title="Login" customClasses="!max-w-md">
      <LoginForm />
    </Container>
  );
}
