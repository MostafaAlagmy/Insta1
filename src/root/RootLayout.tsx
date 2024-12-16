import BottomBarSide from "@/components/Shared/BottomBarSide"
import LeftBarSide from "@/components/Shared/LeftBarSide"
import TopBarSide from "@/components/Shared/TopBarSide"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="md:flex text-white h-screen     w-full">
      
      
     

    <TopBarSide/>
      <LeftBarSide/>
      <div className="h-full flex-1 flex   ">
      <Outlet>


     </Outlet>

      </div>
      <BottomBarSide/>


      

     
      
    </div>
  )
}

export default RootLayout