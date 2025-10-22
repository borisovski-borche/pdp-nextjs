import Container from "@/components/common/container/container";
import RegisterForm from "@/components/forms/register/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2 Portal - Register",
  description: "Register page for the portal",
};

export default function Register() {
  return (
    <Container title="Register" customClasses="!max-w-md">
      <RegisterForm />
    </Container>
  );
}
