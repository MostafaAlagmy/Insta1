import { Link, useParams } from "react-router-dom"
import { useGetUserBId } from "./../../lib/react-query/queryAndMutations"
import { Models } from "appwrite"

const Profile = () => {
  let {id}=useParams()
  let {data:user}=useGetUserBId(id||'')
  console.log(user,'useeeeeeeeeeeeer');
  
  return (
    <div className="profile-container">
      <div className="flex flex-1 max-w-5xl flex-col gap-8 w-full ">

        <div className=" flex  gap-7">

          <img src={user?.imageurl} className="w-[100px]  h-[100px] rounded-full" alt="" />

          <div>
            <h1 className="h1-semibold ">{user?.name}</h1>
            <h3 className="text-[18px] text-[#7878A3] ">{user?.username}</h3>

            <div className="flex my-5 font-[400] gap-5">

              <div>
                <h3 className="text-[20px] text-[#877EFF] ">273</h3>
                <h3 className="text-[18px]  ">Posts</h3>
              </div>

              <div>
                <h3 className="text-[20px] text-[#877EFF] ">147</h3>
                <h3 className="text-[18px]  ">Followers</h3>
              </div>

              <div>
                <h3 className="text-[20px] text-[#877EFF] ">151</h3>
                <h3 className="text-[18px]  ">following</h3>
              </div>

            </div>

            <p className="text-[16px] lg:w-[50%] w-[100%] max-w-full tracking-tight">🌿 Capturing the essence of nature through my lens 
            ✨ "In every walk with nature, one receives far more than he seeks." - John Muir</p>


          </div>




        </div>

        <div className="flex justify-between">

          <div className="w-[100%]  lg:w-[50%] rounded-l-md rounded-r-md  border-[#101012]  bg-[#09090A] flex ">
           <Link to='' className="flex-1 border-0 border-r-[1px] rounded-l-md   border-[#101012] flex  justify-center   h-[35px] items-center gap-3 ">

           <img className="w-[15px]" src="/assets/icons/posts.svg"  alt="" />
           <h3>posts</h3>

           
           </Link>

           <Link to='/' className='flex-1 flex  justify-center   h-[35px] items-center gap-3'>

              <img className="w-[15px]" src="/assets/icons/save.svg"  alt="" />
              <h3>Saved</h3>


          </Link>

          <Link to='/' className='flex-1  border-0 border-l-[1px] rounded-r-md border-[#101012] flex  justify-center   h-[35px] items-center gap-3'>

            <img className="w-[15px]" src="/assets/icons/like.svg"  alt="" />
            <h3>Like</h3>



            </Link>

          </div>

       

        </div>

        <div>

       

       <div  className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {user?.saves.map((x:Models.Document)=>{
          return <div key={x?.$id} className="">
            <Link to={`/postdetails/${x?.post.$id}`}>
            
            
            <img src={x.post.image}  className="w-[100%] rounded-[16px] h-[250px]" alt="" />
            </Link>
          
          </div>
        })}


        
        

       </div>

       <div  className="grid  grid-cols-1 lg:grid-cols-3 gap-4">

                {user?.liked.map((x:Models.Document)=>{
                  return <div key={x.$id} className="">
                    <Link to={`/postdetails/${x.$id}`}>
                    
                    
                    <img src={x.image}  className="w-[100%] rounded-[16px] h-[250px]" alt="" />
                    </Link>
                  
                  </div>
                })}





        </div>

       </div>

       
        
        

        


      </div>
      
    </div>
  )
}

export default Profile
