import { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useKanban } from "../context/KanbanContext";
import { TaskCard } from "./TaskCard";
import type { Column } from "../types";
import { nanoid } from "nanoid";
import Dialog from "./ui/Dialog";
import axios from "axios";
import { BACKEND_URL } from "../config/url";

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { dispatch } = useKanban();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem("userId")

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("columnId");

    if (sourceColumnId !== column.id) {
      dispatch({
        type: "MOVE_TASK",
        fromColumnId: sourceColumnId,
        toColumnId: column.id,
        taskId,
      });
    }
  };

  const addTaskInDB = async (id: string) => {
    try {
      await axios.post(
        `${BACKEND_URL}/task/add`,
        {
          id,
          title: newTaskTitle,
          description,
          authorId: userId,
          columnId: column.id
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const id = nanoid();
      dispatch({
        type: "ADD_TASK",
        columnId: column.id,
        task: {
          id,
          title: newTaskTitle,
          description: description,
          authorId: userId || "" ,
          labels: [],
          comments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      addTaskInDB(id);
      setNewTaskTitle("");
      setDescription("");
      setOpen(false);
    }
  };

  return (
    <div
      className="flex-shrink-0 w-80 bg-white rounded-lg p-4 "
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold ">{column.title}</h3>
          <span className="text-sm text-gray-500 ">{column.tasks.length}</span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded ">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="border-b w-full mb-2" />

      <div className="flex flex-col-reverse space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} />
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center gap-1 mt-3 px-3 py-2 w-full text-gray-600 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
          Add a card
        </button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="p-2 sm:w-[380px] md:w-[450px]">
            <h3 className="text-xl font-bold">Add Task</h3>
            <p className="text-zinc-600 text-sm mb-4 font-light">
              Add a new task in your todo.
            </p>
            <div className="">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTask();
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
                onClick={handleAddTask}
                className="bg-slate-900 hover:bg-slate-800/100 text-white p-2 rounded-md mt-4 w-28"
              >
                Add task
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
