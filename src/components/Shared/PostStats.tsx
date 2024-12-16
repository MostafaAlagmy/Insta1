import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useDeleteSavedPost, useGetLikedPost, useGetSavedPost , useCurrentUser  } from "./../../lib/react-query/queryAndMutations";
import { checkIsLiked } from "./../../lib/utils";

import Loader from "./Loader";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
  };
const PostStats = ({ post, userId }: PostStatsProps) => {

  let likeList=post?.Likes.map((user:Models.Document)=>user.$id )

  

    let[likes,setlikes]=useState<string[]>(likeList)

    let[isSaved,setisSaved]=useState<boolean>(false)

    let { mutate: likePost,isPending:isLikePost } =useGetLikedPost()

    const { mutate: deleteSavePost ,isPending:isDeletingSave }  =useDeleteSavedPost()

    let { mutate: savePost ,isPending:isSave }  =useGetSavedPost()

    let {data:currentUser}=useCurrentUser()
    

    const savedPost=currentUser?.saves.find(
      (save:Models.Document)=> save.post?.$id===post.$id
    )
    useEffect(()=>{
      if(savedPost){
        setisSaved(!!savedPost)

      }

    },[currentUser,post.$id])


  function handleLikePost(e:React.MouseEvent){
    e.stopPropagation();
    let newLikes=[...likes]
    if(likes.includes(userId)){
      newLikes=newLikes.filter((Id)=> Id !== userId)
      


    }else{

      newLikes.push(userId)

    }
   
    setlikes(newLikes)
    likePost({postId:post.$id,likeArray:newLikes})




  }
  function handleSavePost(e:React.MouseEvent){
    e.stopPropagation();
    if(savedPost){
      setisSaved(false)
    return  deleteSavePost(savedPost.$id)

    }
    setisSaved(true)
    savePost({postId:post?.$id,userId:userId})
   



  }

 

  
  
   
  
    

  
  return (
    <div
    className={`flex justify-between items-center  z-20 `}>
    <div className="flex gap-2 mr-5">
      {isLikePost?<Loader />:<>
      <img
       
        src={`${checkIsLiked(likes,userId)?'/assets/icons/liked.svg':'/assets/icons/like.svg'}`}

        alt="like"
        width={20}
        height={20}
        onClick={handleLikePost}
       
        className="cursor-pointer"
      />
       <p className="small-medium lg:base-medium">{likes.length}</p>
      </>}
     
    </div>

    <div className="flex gap-2">
      {isSave || isDeletingSave ?<Loader /> :
      <img
        src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
        alt="share"
        width={20}
        height={20}
        onClick={handleSavePost}
        className="cursor-pointer"
       
      />
    }
    </div>
  </div>
  )
}

export default PostStats