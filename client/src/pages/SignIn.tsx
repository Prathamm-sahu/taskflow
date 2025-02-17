import { FC } from "react";
import SignInForm from "../components/SignInForm";
import Quote from "../components/Quote";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  return (
    <div className="auth-container">
      <div>
        <SignInForm />
      </div>
      <div className="quote-section">
        <Quote />
      </div>
    </div>
  );
};

export default SignIn;
