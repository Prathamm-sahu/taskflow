import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/url";

interface SignUpFormProps {}

interface SignUpInputProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

const SignUpForm: FC<SignUpFormProps> = () => {
  const navigate = useNavigate()
  const [postInput, setPostInput] = useState<SignUpInputProps>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const onSignUp = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInput)
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
      navigate("/blogs")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center">Create an account</h1>
        <div className="text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Login
          </Link>
        </div>

        <div className="mt-10">
          <LabelledInput
            label="Name"
            placeholder="Pratham Sahu"
            onChange={(e) => {
              setPostInput((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <LabelledInput
            label="Username"
            placeholder="Pratham123123"
            onChange={(e) => {
              setPostInput((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
          <LabelledInput
            label="email"
            placeholder="xyz@xyz.com"
            onChange={(e) => {
              setPostInput((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="password..."
            onChange={(e) => {
              setPostInput((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />

          <button
            type="button"
            onClick={onSignUp}
            className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-2 text-base font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type || "text"}
        id={label}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-80 p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default SignUpForm;
