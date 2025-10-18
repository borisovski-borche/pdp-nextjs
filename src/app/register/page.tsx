import Container from "@/components/common/container/container";
import RegisterForm from "@/components/forms/register/register-form";

export default function Register() {
  return (
    <Container title="Register" customClasses="!max-w-md">
      <RegisterForm />
    </Container>
  );
}
