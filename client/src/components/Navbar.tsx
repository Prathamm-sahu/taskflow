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
    <header className="navheader">
      <div className="header-left">
        <div className="header-logo">
          T
        </div>
        <h1 className="header-title">TaskFlow</h1>
      </div>

      <div className="search-container">
        <div className="hidden md:block relative w-full">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {userId ? (
        <div className="user-section">
          {/* <button
            onClick={() => dispatch({ type: "UNDO" })}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg "
          >
            <Undo className="w-5 h-5" />
          </button> */}

          <div className="user-section">
            <div className="user-avatar">
              <img
                src={"/logo.png"}
                alt="CN"
                className=""
              />
            </div>

            <button onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("userId")
              window.location.pathname = "/signin"
            }} className="logout-button">
              <LogOut />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="signin-button"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Navbar;
