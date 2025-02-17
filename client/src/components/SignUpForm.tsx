import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/url";
import { useKanban } from "../context/KanbanContext";
import { Loader } from "lucide-react";

interface SignUpFormProps {}

interface SignUpInputProps {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: FC<SignUpFormProps> = () => {
  const navigate = useNavigate()
  const [postInput, setPostInput] = useState<SignUpInputProps>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useKanban()

  const onSignUp = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(`${BACKEND_URL}/user/signup`, postInput)
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.userId)
      dispatch({ type: "ADD_COLUMN", column: { id: data.column1Id, title: "To Do", tasks: [] }})
      dispatch({ type: "ADD_COLUMN", column: { id: data.column2Id, title: "In Progress", tasks: [] }})
      dispatch({ type: "ADD_COLUMN", column: { id: data.column3Id, title: "Done", tasks: [] }})
      navigate("/")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Create an account</h1>
        <div className="login-text">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Login
          </Link>
        </div>

        <div className="input-container">
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
            label="Email"
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
                password: e.target.value,
              }));
            }}
          />

          <button
            type="button"
            onClick={onSignUp}
            className="flex justify-center items-center w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {isLoading ? <Loader className="loader-icon" /> : null }
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
        className="input-field"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default SignUpForm;
