"use client"

import { createContext, useContext, useReducer } from "react"
import { produce } from "immer"
import type { KanbanState, KanbanAction, Column } from "../types"

const initialColumns: Column[] = []

const initialState: KanbanState = {
  columns: initialColumns,
  history: [initialColumns],
  darkMode: false,
}

const KanbanContext = createContext<{
  state: KanbanState
  dispatch: React.Dispatch<KanbanAction>
} | null>(null)

export function kanbanReducer(state: KanbanState, action: KanbanAction): KanbanState {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_TASK": {
        const column = draft.columns.find((col) => col.id === action.columnId)
        if (column) {
          column.tasks.push(action.task)
          draft.history.push(JSON.parse(JSON.stringify(draft.columns)))
        }
        break
      }
      case "EDIT_TASK": {
        const column = draft.columns.find((col) => col.tasks.some((task) => task.id === action.taskId))
        if (column) {
          const task = column.tasks.find((t) => t.id === action.taskId)
          if (task) {
            Object.assign(task, action.updates)
            draft.history.push(JSON.parse(JSON.stringify(draft.columns)))
          }
        }
        break
      }
      case "DELETE_TASK": {
        const column = draft.columns.find((col) => col.id === action.columnId)
        if (column) {
          column.tasks = column.tasks.filter((task) => task.id !== action.taskId)
          draft.history.push(JSON.parse(JSON.stringify(draft.columns)))
        }
        break
      }
      case "MOVE_TASK": {
        const sourceColumn = draft.columns.find((col) => col.id === action.fromColumnId)
        const targetColumn = draft.columns.find((col) => col.id === action.toColumnId)
        if (sourceColumn && targetColumn) {
          const taskIndex = sourceColumn.tasks.findIndex((task) => task.id === action.taskId)
          if (taskIndex !== -1) {
            const [task] = sourceColumn.tasks.splice(taskIndex, 1)
            targetColumn.tasks.push(task)
            draft.history.push(JSON.parse(JSON.stringify(draft.columns)))
          }
        }
        break
      }
      case "ADD_COLUMN": {
        draft.columns.push(action.column)
        draft.history.push(JSON.parse(JSON.stringify(draft.columns)))
        break
      }
      case "ADD_COMMENT": {
        draft.columns.forEach((column) => {
          const task = column.tasks.find((t) => t.id === action.taskId)
          if (task) {
            task.comments.push(action.comment)
            draft.history.push(JSON.parse(JSON.stringify(draft.columns)))
          }
        })
        break
      }
      case "TOGGLE_THEME": {
        draft.darkMode = !draft.darkMode
        console.log(draft.darkMode)
        break
      }
      case "UNDO": {
        if (draft.history.length > 1) {
          draft.history.pop()
          draft.columns = JSON.parse(JSON.stringify(draft.history[draft.history.length - 1]))
        }
        break
      }
    }
  })
}

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(kanbanReducer, initialState)

  // useEffect(() => {
  //   const savedState = localStorage.getItem("kanbanState")
  //   if (savedState) {
  //     const parsed = JSON.parse(savedState)
  //     dispatch({ type: "RESTORE_STATE", state: parsed })
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem("kanbanState", JSON.stringify(state))
  // }, [state])

  return <KanbanContext.Provider value={{ state, dispatch }}>{children}</KanbanContext.Provider>
}

export function useKanban() {
  const context = useContext(KanbanContext)
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider")
  }
  return context
}

