
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
import { formSchemaRegister } from './../../lib/validation/index';
import Loader from './../../components/Shared/Loader';
import { Link, useNavigate } from "react-router-dom";
// import CreateUserAccount1, { SigninUserAccount1 } from "./../../lib/AppWrite/Api";
import { useCreateAccountMutation, useSigninAccountMutation } from "./../../lib/react-query/queryAndMutations";
import { useUserContext } from "./../../Context/Contextapp";

const Register = () => {
  let navigate=useNavigate()
  let {user:currentUser,checkAuthUser}= useUserContext()
  console.log(currentUser);
  

  

  const { toast } = useToast()


 

  const form = useForm<z.infer<typeof formSchemaRegister>>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      name:'',
      username: '',
      email:'',
      password:''
      
    },
  });
  
 // Queries
  let { mutateAsync: createUserAccount}=useCreateAccountMutation()
  let { mutateAsync: SigninUserAccount1,isPending:isAcounting}=useSigninAccountMutation()


 
   // Submit Function

 async function onSubmit(values: z.infer<typeof formSchemaRegister>) {
 
  const newUser = await createUserAccount(values);
  if(newUser=='problem had happen'){
    toast({

      title: "error had happen",
      description: "A user with the same email already exists11 ",
    })
    return false

  }
  
  
  
 

  let session=await SigninUserAccount1({
    email:values.email,
    password:values.password
    
  })
   
  if(!session){
   

      toast({

        title: "error had happen",
        description: "A user with the same email already exists ",
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
        <h2 className="font-bold text-[25px] mt-3">Create new account</h2>
        <p className="text-slate-600 mt-3">to use this app please enter your details</p>

        </div>
        
     

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 mt-3"
      >
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-start">Name</FormLabel>
              <FormControl>
                <Input type="text" className="  bg-zinc-900  focus-border-none  border-none p-4" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
          
          
        />
         <FormField 
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-start">Username</FormLabel>
              <FormControl>
                <Input type="text" className=" bg-zinc-900  focus-border-none  border-none p-4" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
          
          
        />
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
        <Button className="mt-4" type="submit">
          {isAcounting?(
            <div>
              <Loader/>
            </div>
          ):'Submit'}
         </Button>
      </form>
      </div>
    </Form>
    <p className="text-white mt-5 text-center text-[15px] lg:text-[17px]">if you alredy have an account ? 
      <Link className="text-blue-600 ml-2 text-[15px] lg:text-[17px]" to={'/login'}>Log in</Link>
    </p>
    </div>
  </div>
  )
}

export default Register
