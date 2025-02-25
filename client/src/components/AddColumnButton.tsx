"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useKanban } from "../context/KanbanContext"
import { nanoid } from "nanoid"
import axios from "axios"
import { BACKEND_URL } from "../config/url"

export function AddColumnButton() {
  const { dispatch } = useKanban()
  const [isAdding, setIsAdding] = useState(false)
  const [columnTitle, setColumnTitle] = useState("")

  const addColumnToDB = async () => {
    try {
      await axios.post(`${BACKEND_URL}/task/addColumn`, 
        {
          title: columnTitle,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  } 

  const handleAddColumn = async () => {
    if (columnTitle.trim()) {
      dispatch({
        type: "ADD_COLUMN",
        column: {
          id: nanoid(),
          title: columnTitle,
          tasks: [],
        },
      })

      addColumnToDB()
      // Fix: set the userId
      // await axios.post("/addColumn", { userId, columnTitle })
      setColumnTitle("")
      setIsAdding(false)
    }
  }

  return (
    <div className="column-container">
      {isAdding ? (
        <div className="column-add-form">
          <input
            type="text"
            placeholder="Enter column title..."
            className="column-input"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddColumn()
              if (e.key === "Escape") setIsAdding(false)
            }}
            autoFocus
          />
          <div className="column-buttons">
            <button
              onClick={handleAddColumn}
              className="column-add-button"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="column-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full p-4 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add another column
          </div>
        </button>
      )}
    </div>
  )
}

