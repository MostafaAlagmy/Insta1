import {  useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateUserAccount1, { CreateNewPost, editPostUp , getRecentPost, getLikedPost, LogoutUser, SigninUserAccount1, getSavedPost, getDeleteSavedPost, getCurrentAccount, getPostById, getDeletePost, InfinitePosts, searchPost, crateComment, getComments, getUserBId } from "../AppWrite/Api";
import { INewPost, INewUser, IUpdatePost } from "../types";
import { Query_Keys } from "./queries";

export function useCreateAccountMutation (){
    return useMutation({
        mutationFn:(user:INewUser)=> CreateUserAccount1(user)
    })
}

export function useSigninAccountMutation (){
    return useMutation({
        mutationFn:
        (user:{email:string;password:string
            
        })=> SigninUserAccount1(user)
    })
}

export function userLogOut (){
    return useMutation({
        mutationFn:LogoutUser

    })
}
export function useCreatePostMutation (){
    let querclint=useQueryClient()
    return useMutation({
        mutationFn:(post:INewPost)=>CreateNewPost(post),
        onSuccess:()=>{
            querclint.invalidateQueries({
                queryKey:[Query_Keys.Get_Recent_post]
            })
        }

    })
}
export function useGetRecentPost(){
    return useQuery({
        queryKey:[Query_Keys.Get_Recent_post],
        queryFn:()=>getRecentPost(),
       
        refetchOnWindowFocus:false,
        staleTime:500000

    })
}
export function useGetLikedPost(){
    let query=useQueryClient()
    return useMutation({
        mutationFn:({postId,likeArray}:{postId:string,likeArray:string[]})=> getLikedPost({postId,likeArray}),
        onSuccess:(data)=>{
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_post_By_Id,data?.$id]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Recent_post]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Posts]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Current_User]
            })
        }
    })
}
export function useGetSavedPost(){
    let query=useQueryClient()
    return useMutation({
        mutationFn:({postId,userId}:{postId:string,userId:string})=> getSavedPost({postId,userId}),
        onSuccess:()=>{
          
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Recent_post]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Posts]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Current_User]
            })
        }
    })
}
export function useDeleteSavedPost(){
    let query=useQueryClient()
    return useMutation({
        mutationFn:(savedId:string)=> getDeleteSavedPost(savedId),
        onSuccess:()=>{
          
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Recent_post]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Posts]
            })
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Current_User]
            })
        }
    })
}
export function useCurrentUser(){
    return useQuery({
        queryKey:[Query_Keys.Get_Current_User],
        queryFn: getCurrentAccount
    })
}
export function useGetPostById(id:string){
    return useQuery({
        queryKey:[Query_Keys.Get_post_By_Id,id],
        queryFn:()=>getPostById(id),
        enabled:!!id
       
    })
}
export  function useUpdatePostNew() {
    let query=useQueryClient()

    return useMutation({

        mutationFn:(post:IUpdatePost)=>editPostUp(post),

        onSuccess:(data)=>{
            
            query.invalidateQueries({

                queryKey:[Query_Keys.Get_post_By_Id,data?.$id],

            })
            query.invalidateQueries({

                queryKey:[Query_Keys.Get_Recent_post],

            })
        }

    })
    
}
export function useGetDeletePost(){
    let query=useQueryClient()
    return useMutation({
        mutationFn:({ id, imageid }: { id?: string; imageid: string })=>getDeletePost(id,imageid),
        onSuccess:()=>{
            query.invalidateQueries({
                queryKey:[Query_Keys.Get_Recent_post]
            })
           

        }

    })
}
export function useGetInfinitePosts(){
    return useInfiniteQuery({
        queryKey:['get_infinte_posts'],
        queryFn:InfinitePosts ,
        getNextPageParam:(lastpage:any)=>{
            if(lastpage && lastpage.documents.length===0){
                return null
            }
            const lastId=lastpage.documents[lastpage.documents.length-1].$id 

            return lastId

        },
        initialPageParam:null
    
    })
}

export function useSearchPost(searchTerm:string){
    console.log('gfdgdf');
    
    return useQuery({
        queryKey:['searchPosts', searchTerm],
        queryFn:()=>searchPost(searchTerm),
        enabled:!!searchTerm,
        staleTime:500000000000000
       
    })
}
export  function useCrateComment() {

    return useMutation({
        mutationFn:({content,userId,postId ,parent}:{content:string,userId:string,postId:string,parent?:string|null})=>crateComment({content,userId,postId ,parent}),
        
    })

    
}
export function useGetComments(postId:string){
    return useQuery({
        queryKey:['getComments'],
        queryFn:()=>getComments(postId)
        ,
    })
}
export function useGetUserBId(id:string){
    return useQuery({
        queryKey:['getUserById'],
        queryFn:()=>getUserBId(id),
        enabled:!!id
    })
}