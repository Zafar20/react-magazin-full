import { FC, ReactNode } from "react"
import Sidebar from "../components/Sidebar/Sidebar"

interface IProps {
  children: ReactNode
}

const MainLayout:FC<IProps> = ({ children }) => {
  return (
   <>
    <div className="main">
      <Sidebar/>
      <div className="container">
        {children}
      </div>
    </div>
   </>
  )
}

export default MainLayout