import { FC, useEffect, useState } from "react";
import Dialog from "./ui/Dialog";
import { useKanban } from "../context/KanbanContext";
import axios from "axios";
import { BACKEND_URL } from "../config/url";
import { Loader } from "lucide-react";

interface UpdateTaskModalProps {
  taskId: string
  columnId: string
  open: boolean
  onClose: () => void
}

const UpdateTaskModal: FC<UpdateTaskModalProps> = ({ taskId, columnId, open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = useKanban()

  const findingTask = () => {
    const column = state.columns.find((col) => col.id === columnId)
    const task = column?.tasks.find((task) => task.id === taskId)

    setTitle(task?.title || "")
    setDescription(task?.description || "")
  }

  const updateTask = async () => {
    try {
      setIsLoading(true)
      await axios.put(`${BACKEND_URL}/task/update`, 
        {
          title,
          description,
          taskId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  } 
  const handleSaveEdit = () => {
    if (title.trim() && description.trim()) {
      dispatch({
        type: "EDIT_TASK",
        taskId: taskId,
        updates: { title, description },
      });
    }
    updateTask()
    onClose()
  };

  useEffect(() => {
    findingTask()
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-2 sm:w-[380px] md:w-[450px]">
        <h3 className="text-xl font-bold">Add Task</h3>
        <p className="text-zinc-600 text-sm mb-4 font-light">
          Update task in your todo.
        </p>
        <div className="">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
              }}
              autoFocus
              className="border-2 border-black/60 rounded-md pl-3 h-10 ring-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Description</label>
            <textarea
              placeholder="Write a short description about your text"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-md pl-2 pt-2 border-2 border-black/60"
            />
          </div>

          <button
            onClick={handleSaveEdit}
            className="bg-slate-900 hover:bg-slate-800/100 text-white p-2 rounded-md mt-4 w-28"
          >
            {isLoading ? <Loader className="animate-spin h-4 w-4 mr-2" /> : null }
            Add task
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateTaskModal;
