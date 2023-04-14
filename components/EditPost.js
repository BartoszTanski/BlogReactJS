import React from 'react'
import { useSession, } from 'next-auth/react';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import {IoMdPhotos} from "react-icons/io";
import { useRef, useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import RichTextEdit from './RichTextEdit';
import BottomOfThePage from './BottomOfThePage';

const EditPost = ({postId}) => {
    const GET_POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${postId}`;
    const [post, setpost] = useState(null)
    useEffect(()=>{
      const fetchData = () =>{
        const response = axios.get(GET_POST_API_ENDPOINT)
        .then((response)=>{
          setpost(response.data);
          setImageToPost(response.data.image);
          setImageToSend(null);
        }).catch((error)=>{
          console.log(error);
          alert("Couldn't retrive this post data");
        });
      };
      fetchData();
    },[]);

  const EDIT_POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts`;
  const {data: session} = useSession();
  const inputRef = useRef(null);
  const inputRefTitle = useRef(null);
  const inputRefTags = useRef(null);
  const inputRefDesc = useRef(null);
  const hiddenFileInput = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const [imageToSend, setImageToSend] = useState(null);
  const [editorState, seteditorState] = useState(false);
  const dispatch = useDispatch();
  const editorChange = () => {
    seteditorState(!editorState);
  }
  const handleClick = () => {
     hiddenFileInput.current.click(); 
  }
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      setImageToSend(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setImageToPost(e.target.result);
      }
    }
    e.target.value = '';
  }

  const removeImage = () => {
    setImageToPost(null);
    setImageToSend(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(imageToSend)
    if(!inputRef.current) return;
    const formData = new FormData();
    formData.append("id",post?.id);
    console.log(imageToSend);
    formData.append("file",imageToSend);
    formData.append("title",inputRefTitle.current.value);
    formData.append("content", inputRef.current.getContent());
    formData.append("tags", inputRefTags.current.value);
    formData.append("description", inputRefDesc.current.value);
    formData.append("author", post?.author); //.split("(edited)")[0] +"(edited by: " + session?.user.name+")")
    //formData.append("email", session?.user.email);
    formData.append("profilePic", post?.profilePic);

    axios.put(EDIT_POST_API_ENDPOINT,formData,{
      headers:{
        Accept:"application/json" 
      },})
      .then((response)=>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        alert("Post updated sucessfully!");
      })
      .catch((error)=>{
        console.log(error);
        alert("Something went wrong :(");
      })
  }

  return (
    <div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
        <div className='pt-2 flex items-center pl-5 space-x-1'>
            <img src={session?.user.image} height={40} width={40} alt="profilePic" className=" top-2 rounded-full border border-gray-300 ">
            </img>
            <p className=' px-8 text-3xl text-center'>Editing post as: {session?.user.name}</p>
         </div>
        <div className='p-4 pt-5   space-x-2'>
            <form className='flex flex-col space-y-2 pr-2'>
              <div>
                  <label className="block pl-4 text-sm font-medium text-gray-500 ">Title</label>
                  <input id="title" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                   ref={inputRefTitle} defaultValue={post?.title}
                   placeholder={`Title:`}>
                  </input> 
              </div>
              <div>
                <label className="block pl-4 text-sm font-medium text-gray-500 ">Description</label>
                <input className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                  ref={inputRefDesc} defaultValue={post?.description}
                  placeholder={`Description:`}>
                </input> 
              </div>

              <div>
                <label className="block pl-4 text-sm font-medium text-gray-500 ">Tags separated by &apos;,&apos;</label>
                <input className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                ref={inputRefTags} defaultValue={post?.tags}
                placeholder={`Tags:`}>
                </input>  
              </div>
            </form>
        </div>
        {imageToPost&&(
            <div className='flex flex-col ml-1'>
                <p className='pl-3' >Current main image:</p>
                <div 
                onClick={removeImage}
                className='flex items-center px-4 py-1 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'>
                    <img src={imageToPost} alt="postImage"  className='h-20 object-contain'></img>
                    <RiDeleteBin6Line className='h-8 hover:text-red-500'/>
                </div>
            </div>
            )}
        <div className='flex justify-evenly py-2 '>
          <div className='flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer'> 
            <HiOutlineVideoCamera size={20} className="text-red-500"/>
            <p className='font-semibold text-gray-600 '>Add Video </p>
          </div>
          <div 
          onClick={handleClick}
          className='flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer'> 
            <IoMdPhotos size={20} className="text-green-500"/>
            <p className='font-semibold text-gray-600 '>Add Main Photo</p>
            <input onChange={addImageToPost} type="file" ref={hiddenFileInput} hidden accept='image/*'></input>
          </div>
        </div>
          <RichTextEdit postContent={post?.content} onChange={editorChange} ref={inputRef}/>
          <div className='flex flex-col px-3 py-5 '>
          <button className='rounded-md bg-gray-300 hover:bg-gray-400 hover:text-gray-700 cursor-pointer text-gray-600 h-10 text-lg font-bold' onClick={handleSubmit}>Update Post</button>
        </div>
        <BottomOfThePage/>
    </div>
  )
}

export default EditPost 