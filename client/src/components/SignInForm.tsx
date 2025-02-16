import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/url";
import { Column } from "../types";
import { useKanban } from "../context/KanbanContext";

interface SignInInputProps {
  email: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useKanban();
  const [postInput, setPostInput] = useState<SignInInputProps>({
    email: "",
    password: "",
  });

  const onSignIn = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/user/signin`,
        postInput
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      // Check whether you have to put update or not.
      fetchData();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const { data }: { data: Column[] } = await axios.get(
        `${BACKEND_URL}/task/columnData`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      data.map((col) => {
        dispatch({
          type: "ADD_COLUMN",
          column: {
            id: col.id,
            title: col.title,
            tasks: col.tasks,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center">
          Login to your account
        </h1>
        <div className="text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/signup" className="underline">
            SignUp
          </Link>
        </div>

        <div className="mt-10">
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
            onClick={onSignIn}
            className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Sign In
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

export default SignInForm;
