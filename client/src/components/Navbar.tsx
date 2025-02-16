import { LogOut, Moon, Search, Sun, Undo } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { useKanban } from "../context/KanbanContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const Navbar: FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const { dispatch } = useKanban();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  return (
    <header className="fixed min-w-full flex items-center justify-between px-6 py-4 bg-white border-b ">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded">
          T
        </div>
        <h1 className="text-xl font-bold">TaskFlow</h1>
      </div>

      <div className="flex items-center w-1/3">
        <div className="hidden md:block relative w-full">
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {userId ? (
        <div className="flex items-center gap-4">
          {/* <button
            onClick={() => dispatch({ type: "UNDO" })}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg "
          >
            <Undo className="w-5 h-5" />
          </button> */}

          <div className="flex gap-5 items-center justify-center">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img
                src={"/logo.png"}
                alt="CN"
                className="aspect-square h-full w-full"
              />
            </div>

            <button onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("userId")
              window.location.pathname = "/signin"
            }}>
              <LogOut />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-slate-900 hover:bg-slate-800/100 text-white p-2 rounded-md w-20"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Navbar;
