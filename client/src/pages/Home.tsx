import { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import Navbar from "../components/Navbar";
import { useKanban } from "../context/KanbanContext";
import { Column } from "../types";
import axios from "axios";
import { BACKEND_URL } from "../config/url";
import { Loader } from "lucide-react";

function Home() {
  const { state, dispatch } = useKanban();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredColumns = state.columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="min-h-screen flex items-center justify-center">
          <Loader className="animate-spin h-6 w-6" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <KanbanBoard filteredColumns={filteredColumns} />
    </>
  );
}

export default Home;
