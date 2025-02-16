import { KanbanColumn } from "./KanbanColumn"
import { AddColumnButton } from "./AddColumnButton"
import { Task } from "../types"

interface KanbanBoardProps {
  filteredColumns: {
    id: string
    title: string
    tasks: Task[]
  }[]
}

export default function KanbanBoard({ filteredColumns }: KanbanBoardProps) {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="">
      <div className="min-h-screen bg-zinc-100">
        <main className="p-6 overflow-x-auto min-h-screen" onDragOver={handleDragOver}>
          <div className="flex gap-6 mt-16">
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

