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
      <div className="kanban-container">
        <main className="kanban-main" onDragOver={handleDragOver}>
          <div className="kanban-columns">
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

