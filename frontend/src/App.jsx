import MainMenu from "./components/MainMenu"
import { Outlet } from "react-router-dom"
function App() {
  return (
    <>
      <div>
        <MainMenu />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
