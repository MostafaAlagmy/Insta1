import { Input } from "@/components/ui/input";
import { useGetInfinitePosts ,useSearchPost} from "./../../lib/react-query/queryAndMutations"
import GridPostList from "@/components/Shared/GridPostList";
import { useInView } from "react-intersection-observer";

import Loader from "@/components/Shared/Loader";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce'; // التعديل هنا
interface SearchResultProps {
  isSearching?:boolean;
   searchPosts?:any

}
const SearchResults = ({  searchPosts }: SearchResultProps) => {
 
  
  if (!searchPosts ) {
   
    return <Loader />;
  } else if (searchPosts && searchPosts.documents.length > 0) {
    return <GridPostList posts={searchPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  let[search,setSearch]=useState('')
  const debouncedSearch = useDebounce(search, 500);
  console.log(debouncedSearch[0]);
  
  let {data:searchPosts}=useSearchPost(debouncedSearch[0])

  
  let {data:posts,hasNextPage,fetchNextPage}=useGetInfinitePosts()

  const shouldShowSearchResults=search !==''

  
  const shouldShowPosts =  posts?.pages.every((item:any) => item.documents.length === 0);
  useEffect(() => {
    if (inView && !search) {
      fetchNextPage();
      
    }
  }, [inView,search]);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={search}
           onChange={(e)=> setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults?<>
        <SearchResults 
        
        searchPosts={searchPosts}
        />


        </>:<>
        {shouldShowPosts?

            <p className="text-light-4 mt-10 text-center w-full">End of posts</p>


        :
        <>
         {
           posts?.pages.map((item:any, index:any) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        }
         {
        hasNextPage?<>
        <div ref={ref}  className="mt-10 mx-auto">
          <Loader />
        </div>
        </>:''
        
      }

        </>
        }

        </>}

       

      </div>
        
     

    </div>
  )
}

export default Explore