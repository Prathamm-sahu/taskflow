import { useState } from "react"
import { Search, Undo, Moon, Sun } from "lucide-react"
import { useKanban } from "../context/KanbanContext"
import { KanbanColumn } from "./KanbanColumn"
import { AddColumnButton } from "./AddColumnButton"

export default function KanbanBoard() {
  const { state, dispatch } = useKanban()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredColumns = state.columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
  }))

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <div className="min-h-screen bg-zinc-100">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b ">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded">K</div>
            <h1 className="text-xl font-bold">KanbanFlow</h1>
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

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch({ type: "UNDO" })}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg "
            >
              <Undo className="w-5 h-5" />
            </button>
            <button
              onClick={() => dispatch({ type: "TOGGLE_THEME" })}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {state.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">JD</div>
          </div>
        </header>

        <main className="p-6 overflow-x-auto min-h-screen" onDragOver={handleDragOver}>
          <div className="flex gap-6">
            {filteredColumns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
            <AddColumnButton />
          </div>
        </main>
      </div>
    </div>
  )
}

