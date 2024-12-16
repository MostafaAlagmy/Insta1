import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useUserContext } from "./../../Context/Contextapp"
import { userLogOut } from "./../../lib/react-query/queryAndMutations"
import { useEffect } from "react"

const TopBarSide = () => {
  let {user}=useUserContext()
  let navigate=useNavigate()
  let{mutate:sigtOut,isSuccess}=userLogOut()
  useEffect(()=>{
    if(isSuccess) {
      navigate(0)
    }

  },[isSuccess])
  console.log(user);
  
  return (
    <section className="topbar ">
     <div className="flex items-center justify-between py-4 px-5">
      <Link to={'/'}>
      <img src="/assets/images/logo.svg"  width={130}
            height={325} className="" alt="" />

      </Link>
      <div className="flex items-center gap-3">
      <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={()=>sigtOut()}


          >
            <img src="/assets/icons/logout.svg" alt="logout" />

          </Button>
    <Link to={`/profile/${user.id}`}>
   
    <img
              src={user.imageurl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
    </Link>
   
        


      </div>

     </div>

    </section>
  )
}

export default TopBarSide