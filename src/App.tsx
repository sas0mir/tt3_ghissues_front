import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <div className="bg-slate-200 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
