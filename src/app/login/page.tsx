import Container from "@/components/common/container/container";
import LoginForm from "@/components/forms/login-form/login-form";

export default function Login() {
  return (
    <Container title="Login" customClasses="!max-w-md">
      <LoginForm />
    </Container>
  );
}
