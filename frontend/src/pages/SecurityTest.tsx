import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { SecuredRequest } from "../components/SecuredRequest";

export const SecurityTest = () => {
  return (
    <>
      <LoginForm />
      <div className="my-3">
        <SecuredRequest />
      </div>
      <div className="my-3 border-2">
        <RegisterForm />
      </div>
    </>
  );
};
