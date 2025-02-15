import type React from "react"

export interface Task {
  id: string
  title: string
  description: string
  status: string
  comments: Comment[]
  labels?: string[]
  createdAt: number
}

export interface Comment {
  id: string
  text: string
  author: string
  createdAt: number 
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface KanbanState {
  columns: Column[]
  history: Column[][] // For undo functionality
  darkMode: boolean
}

export interface KanbanContextType {
  state: KanbanState
  dispatch: React.Dispatch<KanbanAction>
}

export type KanbanAction =
| { type: "ADD_TASK"; columnId: string; task: Task }
| { type: "EDIT_TASK"; taskId: string; updates: Partial<Task> }
| { type: "DELETE_TASK"; columnId: string; taskId: string }
| { type: "MOVE_TASK"; fromColumnId: string; toColumnId: string; taskId: string }
| { type: "ADD_COLUMN"; column: Column }
| { type: "ADD_COMMENT"; taskId: string; comment: Comment }
| { type: "TOGGLE_THEME" }
| { type: "UNDO" }

