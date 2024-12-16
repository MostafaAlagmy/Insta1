import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentAccount } from "./../lib/AppWrite/Api";
import { IUser } from "src/lib/types";

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageurl: "",
    bio: "",
  };
  const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
  };
  
  type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  };

  let authData=createContext<IContextType>(INITIAL_STATE)

const Contextapp = ({ children }: { children: React.ReactNode }) => {
    let navigate=useNavigate()
    let[user,setUser]=useState<IUser>(INITIAL_USER)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   async function checkAuthUser(){

        setIsLoading(true)
        try{
            let currentAcount= await getCurrentAccount()
            
            console.log(currentAcount,'hello');
            
            if(currentAcount){
                setUser({
                    id: currentAcount.$id,
    name: currentAcount.name,
    username: currentAcount.username,
    bio: currentAcount.bio,
    email: currentAcount.email,
    imageurl: currentAcount.imageurl,
   

                })
                setIsAuthenticated(true)
                return true;
            }
            return false;


        }catch(error){
            console.log(error);
            return false
            
        }finally{
            setIsLoading(false)
        }
    }
    useEffect( () => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" ||
          cookieFallback === null ||
          cookieFallback === undefined
        ) {
          
          navigate("/register");
        }
       async function chechuser(){
        console.log('work');
        

        
       await checkAuthUser();
    }
    chechuser()

      }, []);

      const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
      };


  return <authData.Provider value={value}>{children}</authData.Provider>
}

export default Contextapp
export const useUserContext=()=> useContext(authData)