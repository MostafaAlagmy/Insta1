import * as z from "zod";
export const formSchemaRegister = z.object({
    name:z.string().min(2,{message:'it is too short'}),
    username: z.string().min(2).max(50),
    email:z.string().email(),
    password:z.string().min(6,{message:'password must be at least 6 letters'})

  });
  export const formSchemaLogin = z.object({
    
    email:z.string().email(),
    password:z.string().min(6,{message:'password must be at least 6 letters'})

  });
  export const postFormValidation = z.object({
    
    caption:z.string().min(2).max(1000),
    location:z.string().min(2).max(1000),
    file:z.custom<File[]>(),
    tags:z.string(),
    


  });
  