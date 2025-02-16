import { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import Navbar from "../components/Navbar";
import { useKanban } from "../context/KanbanContext";
import { Column } from "../types";
import axios from "axios";
import { BACKEND_URL } from "../config/url";

function Home() {
  const { state, dispatch } = useKanban();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredColumns = state.columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

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

  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <KanbanBoard filteredColumns={filteredColumns} />
    </>
  );
}

export default Home;
