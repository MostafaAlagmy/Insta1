import {  Link, useNavigate, useParams } from "react-router-dom" ; 

import { useUserContext } from "./../../Context/Contextapp";

import { multiFormatDateString } from "./../../lib/utils";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/Shared/PostStats";
import  Loader  from '@/components/Shared/Loader';
import { useState } from "react";
import { Models } from "appwrite";
import { useCurrentUser , useCrateComment ,useGetComments ,useGetDeletePost ,useGetPostById} from './../../lib/react-query/queryAndMutations';

 const PostDetails = () => {
 
   
  const navigate = useNavigate();
  const { id } = useParams();
 
 let {data:post,isPending:isLoading}=useGetPostById(id||'')
 
 

 let {mutateAsync:deletePost,isPending:isDeleting}=useGetDeletePost()
 let[comment,setComment]=useState<string>('')

 let {mutateAsync:createComment}=useCrateComment()
  
 

  
  let {data:Comments}=useGetComments(id ||'' )
  console.log(Comments);
  

  
  const { user} = useUserContext();
  let {data:currentUser}=useCurrentUser()
  console.log(currentUser?.$id,'user');
  

 

 async function  handleComment(e:React.FormEvent){
  e.stopPropagation();
  e.preventDefault()
  if(comment==''){
    return false
  }
  
  
  
  let newComment = await createComment({

    content:comment,
    userId:currentUser?.$id as string,
    postId:post?.$id as string,
    parent:null
  })
  if(!newComment) console.log('problem');
  const commentInput = document.querySelector('#inputCooment') as HTMLInputElement | null;
  if (commentInput) {
    commentInput.value = ''; // فقط قم بتحديث القيمة إذا كان العنصر موجودًا
  }
 
 
  
  if (newComment) {
    Comments?.push(newComment); // فقط أضف إذا كان newComment موجودًا
  } else {
    console.log('problem'); // تعامل مع الخطأ هنا
  }
  
  
  
 }


// useGetDeletePost
async function handleDeletePost(){


  let x=await deletePost( { id:id, imageid:post?.imageid})

  console.log(x);

  navigate('/')
  

}

 
  
  return (
    <div className="post_details-container">
    <div className="hidden md:flex max-w-5xl w-full">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="shad-button_ghost">
        <img
          src={"/assets/icons/back.svg"}
          alt="back"
          width={24}
          height={24}
        />
        <p className="small-medium lg:base-medium">Back</p>
      </Button>
    </div>

    {isLoading || !post ? (
      <Loader />
    ) : (
      <div className="post_details-card">
       
        <img
          src={post?.image}
          alt="creator"
          className="post_details-img"
        />
       

        <div className="post_details-info">
          <div className="flex-between w-full ح-3">
            <Link
              to={`/profile/${post?.creator.$id}`}
              className="flex items-center gap-3">
              <img
                src={
                  post?.creator.imageurl  ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
              />
              <div className="flex gap-1 flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post?.creator.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular ">
                    {multiFormatDateString(post?.$createdAt)}
                  </p>
                  •
                  <p className="subtle-semibold lg:small-regular">
                    {post?.location}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex-center gap-4">
              <Link
                to={`/editpost/${post?.$id}`}
                className={`${user.id !== post?.creator.$id && "hidden"}`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={24}
                  height={24}
                />
              </Link>

              <Button
                onClick={handleDeletePost}
                variant="ghost"
                className={`ost_details-delete_btn ${
                  user.id !== post?.creator.$id && "hidden"
                }`}>
                  {isDeleting?<Loader/>:
                <img
                  src={"/assets/icons/delete.svg"}
                  alt="delete"
                  width={24}
                  height={24}
                />
              }
              </Button>
            </div>
          </div>

         

          <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
            <p>{post?.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post?.tags.map((tag: string, index: string) => (
                <li
                  key={`${tag}${index}`}
                  className="text-light-3 small-regular">
                  #{tag}
                </li>
              ))}
            </ul>
            <hr className="border w-full my-5 border-dark-4/80" />


           <div className="mt-4 flex flex-1 flex-col justify-between">
            
            <div className="flex flex-col gap-8 max-h-[130px]  overflow-scroll custom-scrollbar">

           

            {Comments?.map((x:Models.Document)=> {
              return <div key={x.$id} className="flex gap-4  ">
                <div className="flex gap-2 items-center">

                
                <img  className="rounded-full w-[36px] h-[36px]" src={x?.creator.imageurl } alt="" />
                <div>
                  <h3 className="text-[14px] text-[#7878A3] font-inter font-[600]">{x?.creator.name}</h3>

                  <h4 className="text-[10px] text-[#7878A3] ">{multiFormatDateString(x.$createdAt)}</h4>

                  

                </div>
                </div>

                <h3 className="text-[15px] tracking-wider">{x?.content}</h3>
               

              


              </div>
            })}
             </div>

             <div className="mt-14">

                 <form  onSubmit={handleComment} className=" relative flex items-center gap-3 lg:mt-[10px]" action="">
              <img src={currentUser?.imageurl} className="w-[32px] h-[32px] rounded-full" alt="" />
              <input id="inputCooment" placeholder="Write Your Comment..." onChange={(e)=>setComment(e.target.value)} type="text" className="w-[100%] placeholder:text-[#5C5C7B] placeholder:text-[16px] bg-[#101012] rounded-[10px] p-2 px-9" />
              <button type="submit"  className="absolute top-[50%] translate-y-[-50%] right-3">
              <img   src={"/assets/icons/send.svg"} alt="" />

              </button>
             
               </form>


            </div>



           </div>
           

          </div>

          <div className="w-full">
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      </div>
    )}

    <div className="w-full max-w-5xl">
      <hr className="border w-full border-dark-4/80" />

      <h3 className="body-bold md:h3-bold w-full my-10">
        More Related Posts
      </h3>
      {/* {isUserPostLoading || !relatedPosts ? (
        <Loader />
      ) : (
        <GridPostList posts={relatedPosts} />
      )} */}
    </div>
  </div>
  )
}

export default PostDetails
