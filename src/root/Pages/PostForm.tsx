 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FileUploader from "@/components/Shared/FileUploader"
import { Textarea } from "@/components/ui/textarea"
import { postFormValidation } from "./../../lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "./../../Context/Contextapp"
import { useCreatePostMutation, useUpdatePostNew } from "./../../lib/react-query/queryAndMutations"
import { useNavigate } from "react-router-dom"
import Loader from "@/components/Shared/Loader"
 
type postFormProps={
    post?:Models.Document |string,
    action:'Update'| 'Create' ;
}

const PostForm = ({post,action}:postFormProps) => {
    let navigate =useNavigate()

    let {user:currentUser}= useUserContext()

    const form = useForm<z.infer<typeof postFormValidation>>({
        resolver: zodResolver(postFormValidation),
        defaultValues: {
          caption: post && typeof post !== 'string' ? post.caption : '',
          location: post && typeof post !== 'string' ? post.location : '',
            file:[],
            tags: post && typeof post !== 'string' ? post.tags.join(',') : '',
            
        },
      })

     
      
      let { mutateAsync: createNewPost ,isPending :iscreate}=useCreatePostMutation() 
      let { mutateAsync: updateNewPost ,isPending :isupdate}=useUpdatePostNew()
     
      // 2. Define a submit handler.
    async  function onSubmit(values: z.infer<typeof postFormValidation>) {
     

      if(action=='Update' && post && typeof post !== 'string'){
        
        let updatePost = await updateNewPost(
          {
              ...values,
              postId:post?.$id,
              imageId:post?.imageid,
              imageUrl:post?.image



          }
      )
      if(!updatePost) {
          console.log('problem happen 11');
          
      }else
      {
          console.log('succeed');
          navigate('/')
          return 'yes'
      }

      }

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        if(!currentUser.id) throw Error
        let newPost= await createNewPost(
            {
                ...values,
                userId:currentUser.id
            }
        )
        if(!newPost) {
            console.log('problem happen 11');
            
        }else
        {
            console.log('succeed');
            navigate('/')
            
        }
       
      
       
      }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                meadiaUrl ={post && typeof post !== 'string'?post.image:''}
                 
                 
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
           >
            {iscreate || isupdate?<> <Loader/> </>:

            action=='Update'?'Update Post':'Post'
}
         
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
