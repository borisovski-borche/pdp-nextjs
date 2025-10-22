import Container from "@/components/common/container/container";
import ChangePasswordForm from "@/components/forms/change-password/change-password-form";

export default function Settings() {
  return (
    <Container title="My Settings">
      <div className="grid grid-cols-2">
        <div className="pr-5 mb-5  border-r-2 border-amber-600">
          <h3 className="text-center text-xl font-bold">Change Password</h3>
          <ChangePasswordForm />
        </div>
      </div>
    </Container>
  );
}
