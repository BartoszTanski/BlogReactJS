import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useRef,useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';

const SearchRegex = ({className}) => {
    const BACKEND_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/search/regex`;
    const searchRef = useRef("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResult, setsearchResult] = useState(null);
    const setDelay = (delay) => {
      return new Promise( res => setTimeout(res, delay) );
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if(searchRef.current.value.length<3){setsearchResult(null); return;}
        else{
        axios.get(BACKEND_API_ENDPOINT,{
            params: {
              regex: searchRef.current.value
            }
          },{
          headers:{
            Accept:"application/json" 
          },})
          .then((response)=>{
            setsearchResult(response.data);
            console.log("Search results: "+response.data.length);
          })
          .catch((error)=>{
            console.log(error);
          })
        }
      }
  return (
    <div className={className} >
      <div className='relative flex flex-col min-w-fit '>
        <div className='flex flex-row'>
        <div className='flex items-center px-2 rounded-full bg-gray-100 text-gray-500'>
            <HiOutlineSearch size={20}/>
            <input name="search" ref={searchRef} onChange={handleSearch} onFocus={() => setIsFocused(true)} onBlur={async () => {await setDelay(100); setIsFocused(false)}} className=' p-1 bg-transparent focus:outline-none' type="text" placeholder='Search Blog (min. 3 char)'></input>
        </div>
        </div>
        <div className='absolute  inset-y-8 w-72 flex flex-col  z-20'>
        {isFocused &&searchResult?.map((result) =>
        (<SearchResult result={result} key={result.id}/>))}
        </div>
    </div>
    </div>
  )
}

export default SearchRegex