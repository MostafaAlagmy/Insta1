import {  ID, Query } from "appwrite";

import { account, avaters, databases, projectConfig, storage } from "./Config";
import { INewPost, INewUser, IUpdatePost } from "../types";

export default async function CreateUserAccount1(user:INewUser){
  try{
    const newAccount=await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name,





    )
    if(!newAccount) throw new Error('error had happen')
      
       // المفروض ده بيقوم بوقف الكود وارسال error الي catch
    else {
     
      
      const avatarUrl = avaters.getInitials(user.name);
      let newuser=await getDatabasaUser({
       accountid:newAccount.$id,
       email:newAccount.email,
       name:newAccount.name,
      
       imageurl:avatarUrl,
       username:user.username
   
      })
      return newuser

    }
   
   

    
   

  } catch(error){
    if(error){
     
      
       return 'problem had happen'

    }
    
    
   
    
  }

}
async function getDatabasaUser(user:{
  accountid:string,
  email:string,
  name:string,
   
    imageurl:URL |string,
    username?:string

}) {
  try{
    let newuser1=await databases.createDocument(
      projectConfig.databasid,
      projectConfig.usersid,
      ID.unique(),
      user
     
  
    )
    return newuser1

  }catch(error){
  
    
  }
 
  
}
export async function SigninUserAccount1(user:{email:string,password:string}) {
  try{
    let session= await account.createEmailPasswordSession(user.email,user.password)

    console.log(session);
    
    return session
  }
  catch(error){
    console.log(error);
    
  }
  
}



async function getAcoount() {
  try{
    let x=await account.get()
    console.log(x,'1');
    
    return x

  }catch(error){
   
    

  }

  
}


export async function getCurrentAccount() {
  try{
    let x=await getAcoount()
    if(!x) throw Error
    const userData=await databases.listDocuments(
      projectConfig.databasid,
      projectConfig.usersid,
      [Query.equal('accountid',x.$id)]
    )
    if(!userData) throw Error
    console.log(userData.documents[0]);
    
    
    

    return userData.documents[0]

  }catch(error){
   
    

  }
  
}


export async function LogoutUser() {
  let session=await account.deleteSession("current")
  return session
  
}

export async function CreateNewPost(post:INewPost) {
  try
  {
    let fileUpload=await uploadFile(post.file[0])

    if(!fileUpload) throw  Error

    let fileUrl=getFilePreview(fileUpload.$id)

    if(!fileUrl){
       await deleteFile(fileUpload.$id)
       throw  Error
    } 

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    let newPost= await databases.createDocument(
      projectConfig.databasid,
      projectConfig.postsid,
      ID.unique(),
      {
        creator:post.userId,
        caption: post.caption,
        image: fileUrl,
        imageid: fileUpload.$id,
        location: post.location,
        tags: tags,
      }
    )

    if (!newPost) {
      await deleteFile(fileUpload.$id);
      throw Error;
    }
    console.log('safd');
    

    return newPost


  }catch(error){
    console.log(error);
    
  }
  
}
async function uploadFile(file:File) {
  try{
    let x=await storage.createFile(
      projectConfig.storageid,
      ID.unique(),
      file
    )
    if(!x) throw  Error 
    return x


  }catch(error){
    console.log(error);
    
  }
  
}
 function getFilePreview(fileId:string){
  try{
        let x=  storage.getFilePreview(
          projectConfig.storageid,
          fileId,

        

        )
        if(!x) throw  Error 
        return x
   
  }catch(error){
    console.log(error);
    
  }
  

}
async function deleteFile(fileId:string) {
  try {
    await storage.deleteFile(projectConfig.storageid,fileId)

    return {status:'ok'}

  }catch(error){
    console.log(error);
    
  }
  
}
export async function getRecentPost() {
  try{
    let x= await databases.listDocuments(
      projectConfig.databasid,
      projectConfig.postsid,
     [ Query.orderDesc('$createdAt'),Query.limit(8)]
    )
    if(!x) throw Error
    console.log(x);
    
    return x

  }catch(error){
    console.log(error);
    
  }
  
}
export async function getLikedPost({postId,likeArray}:{postId:string,likeArray:string[]}) {
  try{
    let x= await databases.updateDocument(
      projectConfig.databasid,
      projectConfig.postsid,
      postId,
      {
        Likes:likeArray
      }
    
    )
    if(!x) throw Error
    console.log(x);
    
    return x

  }catch(error){
    console.log(error);
    
  }
  
}
export async function getSavedPost({postId,userId}:{postId:string,userId:string}) {
  try{
    let x= await databases.createDocument(
      projectConfig.databasid,
      projectConfig.savesid,
      ID.unique(),
      {
        user:userId,
        post:postId
      }
    
    )
    if(!x) throw Error
    console.log(x);
    
    return x

  }catch(error){
    console.log(error);
    
  }
  
}
export async function getDeleteSavedPost(savedId:string) {
  try{
    let x= await databases.deleteDocument(
      projectConfig.databasid,
      projectConfig.savesid,
      savedId,
      
    )
    if(!x) throw Error
    console.log(x);
    
    return {status:'ok'}

  }catch(error){
    console.log(error);
    
  }
  
}
export async function getPostById(id:string) {
  try {
    let x= await databases.getDocument(
      projectConfig.databasid,
      projectConfig.postsid,
      id
    )
    if(!x)throw Error
    return x

  }catch(error){
    console.log(error);
    
  }
  
}
export async function editPostUp (post:IUpdatePost) {
  let Image={
    imageid: post.imageId ,
    image: post.imageUrl
  }

  
 
  try
  {

   

    if(post.file.length>0)
      {
            let fileUpload=await uploadFile(post.file[0])

            if(!fileUpload) throw  Error

           let fileUrl=getFilePreview(fileUpload.$id)

          if(!fileUrl){
       await deleteFile(fileUpload.$id)
       throw  Error
             } 
           
             Image={...Image,imageid:fileUpload.$id,image :  new URL(fileUrl)}
        
      }
    

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    let updatedPost= await databases.updateDocument(
      projectConfig.databasid,
      projectConfig.postsid,
      post.postId,
      {
        
        caption: post.caption,
        image: Image.image,
        imageid: Image.imageid,
        location: post.location,
        tags: tags,
      }
    )

    if (!updatedPost) {
      if(post.file.length>0){
        await deleteFile(Image.imageid);
      throw Error;

      }
      
    }
    console.log('safd');
    if(updatedPost){
      await deleteFile(post.imageId);

    }
    

    return updatedPost


  }catch(error){
    console.log(error);
    
  }

  
} 
export async function getDeletePost(id?:string,imageid?:string) {
  if(!id || ! imageid) return false
  try {
    let x= await databases.deleteDocument(
      projectConfig.databasid,
      projectConfig.postsid,
      id
    )
    if(!x)throw Error
  await deleteFile(imageid)
    
    

    

  }catch(error){
    console.log(error);
    
  }
  
}
export async function InfinitePosts({ pageParam }: { pageParam: number }) {
  let queries:any[]=[Query.orderDesc('$updatedAt'),Query.limit(3)]

  if(pageParam){
    queries.push(  Query.cursorAfter(pageParam.toString()) )

  }
  try {
    let data=await databases.listDocuments(
      projectConfig.databasid,
      projectConfig.postsid,
      queries
    )
    if(!data) throw new Error('problem had happen')
    console.log(data);
    return data
    

  }catch(error){
    console.log(error);
    
  }
  
}
export async function searchPost(searchTerm:string) {
  console.log(searchTerm);
  
  try
  {
    let x= await databases.listDocuments(
      projectConfig.databasid,
      projectConfig.postsid,
    [Query.search('caption',searchTerm)]
    )
    if(!x) throw new Error('error')
    console.log(x);
      
    return x

  }catch(error){
    console.log(error,'fdsdfsd');
    
    
  }
  
}
export async function crateComment({content,userId,postId ,parent}:{content:string,userId:string,postId:string,parent?:string|null}) {
  
  try {
    let x=await databases.createDocument(
      projectConfig.databasid,
      projectConfig.commentid,
      ID.unique(),
      {
        content:content,
        postId:postId,
        creator:userId,
        parent:parent



      }

    )
    if(!x) throw Error 
    console.log('nice work');
    
    return x
  }catch(error){
    console.log(error);
    
  }
  
}
export async function getComments(postId:string) {  
  console.log(postId);
  
  try {
    let x=await databases.listDocuments(
      projectConfig.databasid,
      projectConfig.commentid,
      [Query.limit(20),Query.orderDesc('$updatedAt'),Query.equal('postId',postId)]
    )
    if(!x) throw Error
    console.log(x.documents);
     
    return x.documents

  }catch(error){
    console.log(error);
    
  }
 
  
}
export async function getUserBId(id:string) {
  console.log(typeof(id),'idddddddddddd');
  
  try {
    let user =await databases.listDocuments(
      projectConfig.databasid,
      projectConfig.usersid,
      [Query.equal('$id',id)]
    )
    if(!user) throw Error 
    console.log(user.documents[0]);
    
    return user.documents[0]

  }catch(error){
    console.log(error);
    
  }
  
}