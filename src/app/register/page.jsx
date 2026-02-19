import { Suspense } from "react";
import LoginForm from "@/Component/Auth/LoginForm";
import { RegisterForm } from "@/Component/Auth/RegisterForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm></RegisterForm>
    </Suspense>
  );
}
