import { useParams } from "react-router-dom"
import PostForm from "./PostForm"
import Loader from "@/components/Shared/Loader"
import { useGetPostById } from "./../../lib/react-query/queryAndMutations"

const EditPost = () => {
  
  let {id}=useParams()
   let {data:post,isPending}=useGetPostById(id||'')

   console.log(post);
   
  

  console.log(post,id,'dsaas');
  if(isPending) return <div className="flex flex-1 justify-center items-center"><Loader/></div>
  
  return (
    <div className="flex flex-1">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img
          src="/assets/icons/add-post.svg"
          width={36}
          height={36}
          alt="add"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post  </h2>
      </div>

      <PostForm action='Update' post={post?post:''} />
    </div>
  </div>
  )
}

export default EditPost