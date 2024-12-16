import React from "react";

import Loader from "@/components/Shared/Loader";
import { useGetRecentPost } from "./../../lib/react-query/queryAndMutations";
import { Models } from "appwrite";
import PostCard from "@/components/Shared/PostCard";
import { useEffect } from 'react';

const Home = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("homeScrollPosition");
    if (savedScrollPosition && containerRef.current) {
      containerRef.current.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  // حفظ موضع التمرير عند التمرير
  const handleScroll = () => {
    console.log('hi');
    
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      localStorage.setItem("homeScrollPosition", scrollTop.toString());
    }
  };

  

 
  

  
  
  let {data:posts,isPending:isLoading}= useGetRecentPost()


  
  return (
    <div className="flex sa flex-1 ">
      <div   ref={containerRef}  onScroll={handleScroll} className="home-container   home-special ">
        <div className="home-posts  ">
          <h3 className="h3-bold  md:h2-bold w-full">
            Home Feed

          </h3>
          {isLoading && !posts ?<>
          <Loader/>
          </>:
         <>
         <ul className="w-full">
          {posts?.documents.map((post:Models.Document)=>
        <li key={post?.$id}>
            <PostCard  post={post}/>

          </li>
              

          )}
       
         </ul>
         </>
          }

        </div>

      </div>
      
      

    
    </div>
  )
}

export default Home