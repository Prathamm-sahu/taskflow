import { useState } from "react"
import KanbanBoard from "../components/KanbanBoard"
import Navbar from "../components/Navbar"
import { useKanban } from "../context/KanbanContext"



function Home() {
  const { state } = useKanban()
  const [searchQuery, setSearchQuery] = useState("")
  
    const filteredColumns = state.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <KanbanBoard filteredColumns={filteredColumns} />
    </>
  )
}

export default Home