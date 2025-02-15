import { FC } from "react";
import SignInForm from "../components/SignInForm";
import Quote from "../components/Quote";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  return (
    <div className="lg:grid grid-cols-2">
      <div>
        <SignInForm />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default SignIn;
