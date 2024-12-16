import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useUserContext } from "./../../Context/Contextapp"
import { sidebarLinks } from "./../../Constants/Constants";
import { userLogOut } from "./../../lib/react-query/queryAndMutations"

import { Button } from "../ui/button";
import { useEffect } from "react";

type INavLink = {
    imgURL: string;
    route: string;
    label: string;
}

const LeftBarSide = () => {
  let navigate=useNavigate()
  let{mutate:sigtOut,isSuccess}=userLogOut()
  useEffect(()=>{
    if(isSuccess) {
      navigate(0)
    }

  },[isSuccess])
  

  let { pathname } =useLocation()

  useEffect(()=>{
    let x= pathname
 x=   x.replace('/','')
    document.title=x
  },[pathname])
  const { user } = useUserContext();
  return (
   <section className="leftsidebar">
    <div>

    
     <Link to="/" className="flex gap-3 m-auto  justify-center items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
      <div className="flex items-center  mt-10">
      <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageurl || "/assets/icons/profile-placeholder.svg"}
              width={45}

              alt="profile"
              className=" rounded-full"

            />
          </Link>
      <div  className="ml-2">
        <h3 className=" body-bold">{user.name}</h3>
        <h5 className="small-regular text-light-3"> @{user.username  }</h5>

      </div>

      </div>

      <ul className="flex mt-6 flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4  items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                      className={`group-hover:invert-white ${
                        isActive && "invert-white"
                      }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
    
      </div>
      <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={()=>sigtOut()}


          >
            <img src="/assets/icons/logout.svg" alt="logout" />

            <p className="">Logout</p>

          </Button>

   </section>
  )
}

export default LeftBarSide