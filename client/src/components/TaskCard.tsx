"use client";

import { useState } from "react";
import {
  Edit2,
  Trash2,
  MessageSquareX,
  MessageSquarePlus,
} from "lucide-react";
import { useKanban } from "../context/KanbanContext";
import type { Task } from "../types";
import type React from "react"; // Added import for React
import { nanoid } from "nanoid";
import UpdateTaskModal from "./UpdateTaskModal";
import { format } from "date-fns"

interface TaskCardProps {
  task: Task;
  columnId: string;
}

export function TaskCard({ task, columnId }: TaskCardProps) {
  const { dispatch } = useKanban();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("columnId", columnId);
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      columnId,
      taskId: task.id,
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch({
        type: "ADD_COMMENT",
        taskId: task.id,
        comment: {
          id: nanoid(),
          text: newComment,
          createdAt: Date.now(),
          author: "JD", // Hardcoded for demo
        },
      });
      setNewComment("");
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-solid border-gray-100"
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="">
            <h4 className="font-medium text-md text-zinc-700 break-words break-all">
              {task.title}
            </h4>
            <p className="text-zinc-600 overflow-wrap break-words break-all">
              {task.description}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setOpen(true)}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded "
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <UpdateTaskModal
              open={open}
              onClose={() => setOpen(false)}
              taskId={task.id}
              columnId={columnId}
            />
            <button
              onClick={handleDelete}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded "
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600 "
                >
                  {label}
                </span>
              ))}
            </div>
          )} */}

        <div className="flex items-center justify-between text-sm text-gray-500 ">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 hover:text-gray-700 "
          >
            {showComments ? (
              <MessageSquareX className="w-4 h-4" />
            ) : (
              <MessageSquarePlus className="w-4 h-4" />
            )}
            {task.comments.length}
          </button>
          <div className="w-10  text-zinc-600 flex items-center justify-center text-xs">
          {format(new Date(task.createdAt), "MMM d")}
          </div>
        </div>

        {showComments && (
          <div className="mt-2 space-y-2 max-h-60 overflow-y-auto overflow-x-hidden">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-1 text-sm border rounded "
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddComment();
                }}
              />
              <button
                onClick={handleAddComment}
                className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="flex flex-col-reverse">
              {task.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="text-sm p-2 bg-gray-50 rounded "
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-gray-500 ">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
