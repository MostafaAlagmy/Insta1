
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "./../../hooks/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaLogin } from './../../lib/validation/index';
import Loader from './../../components/Shared/Loader';
import { Link, useNavigate } from "react-router-dom";
// import CreateUserAccount1, { SigninUserAccount1 } from "./../../lib/AppWrite/Api";
import {  useSigninAccountMutation } from "./../../lib/react-query/queryAndMutations";
import { useUserContext } from "./../../Context/Contextapp";

const Login = () => {
  let navigate=useNavigate()
  let {user:currentUser,checkAuthUser}= useUserContext()
  console.log(currentUser);
  

  

  const { toast } = useToast()


 

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      
      email:'',
      password:''
      
    },
  });
  
 // Queries
  let { mutateAsync: SigninUserAccount1,isPending:isAcounting}=useSigninAccountMutation()


 
   // Submit Function

 async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
 
 
  
  
  
 

  let session=await SigninUserAccount1({
    email:values.email,
    password:values.password
    
  })
   
  if(!session){
   

      toast({

        title: "error had happen",
        description: " please try again ",
      })

  }else{
    console.log(session);
    
  }
  let checkAuthUser1=await checkAuthUser()
  if(checkAuthUser1){
    console.log('hi');
    form.reset()

    

    navigate('/')


  }else{
   console.log('error ');
   
  }
 
   
    
    
 
  }
  return (
    <div className=" ">
    <div className=" w-[80%] xl:w-[50%] m-auto ">

   
    <Form  {...form}>
      <div className=" text-white">
        <div className="text-center text-white">
        <img src="/assets/images/logo.svg" className="block    mx-auto" alt="" />
        <h2 className="font-bold text-[25px] mt-3">Log In Your Account </h2>
        <p className="text-slate-600 mt-3">Welome Back Please Enter Your Details </p>

        </div>
        
     

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 mt-3"
      >
       
         <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-start">Email</FormLabel>
              <FormControl>
                <Input type="email" className=" bg-zinc-900  focus-border-none  border-none p-4" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
          
          
        />
         <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-start">Password</FormLabel>
              <FormControl>
                <Input type="password" className=" bg-zinc-900  focus-border-none  border-none p-4" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
          
          
        />
        <Button className="mt-4 bg-slate-600 p-6" type="submit">
          {isAcounting?(
            <div>
              <Loader/>
            </div>
          ):'Submit'}
         </Button>
      </form>
      </div>
    </Form>
    <p  className="text-white mt-5 text-center lg:text-[17px] text-[16px]"> don't have an account ? 
      <Link className="text-blue-600 ml-2 text-[15px] lg:text-[17px]" to={'/register'}>Register now</Link>
    </p>
    </div>
  </div>
  )
}

export default Login
