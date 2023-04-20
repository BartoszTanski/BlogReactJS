import React from 'react'
import { useSession, } from 'next-auth/react';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import {IoMdPhotos} from "react-icons/io";
import { useRef, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setStoreTime } from '@/public/src/features/postSlice';
import axios from 'axios';
import RichTextEdit from './RichTextEdit';
import BottomOfThePage from './BottomOfThePage';
import DialogBox from './DialogBox';

const CreatePost = () => {
  const [postAdded, setpostAdded] = useState(false)
  const [postAddedFailure, setpostAddedFailure] = useState(false)
  const [videoUploadFailure, setvideoUploadFailure] = useState(false)

  const handleSucces = (e) => { //close modal after clicking ok 
    setpostAdded(false);
    setpostAddedFailure(false);
    setvideoUploadFailure(false);
  }

  const BACKEND_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts`;
  const VIDEO_BACKEND_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video`;
  const {data: session} = useSession();
  const inputRef = useRef(null);
  const inputRefTitle = useRef(null);
  const inputRefTags = useRef(null);
  const inputRefDesc = useRef(null);
  const videoId = useRef(null);
  const hiddenFileInput = useRef(null);
  const hiddenVideoInput = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const [imageToSend, setImageToSend] = useState(null);
  const [videoToPost, setVideoToPost] = useState(null);
  const [videoToSend, setVideoToSend] = useState(null);
  const [editorState, seteditorState] = useState(false);
  const dispatch = useDispatch();
  const editorChange = () => {
    seteditorState(!editorState);
  }
  const handleClick = () => {
     hiddenFileInput.current.click(); 
  }
  const handleClickVideo = () => {
    hiddenVideoInput.current.click(); 
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
  const addVideoToPost = (e) => {

    if(e.target.files[0]){
      setVideoToSend(e.target.files[0]);
      setVideoToPost(URL.createObjectURL(e.target.files[0]));
    }
    e.target.value = '';
  }
  const sendVideo = async () => {
    const formDataVideo = new FormData();
    formDataVideo.append("video",videoToSend);
    await axios.post(VIDEO_BACKEND_API_ENDPOINT,formDataVideo,{
      headers:{
          Accept:"application/json" 
      },})
      .then((response)=>{
        removeVideo();
        videoId.current = response.data;
      })
      .catch((error)=>{
        console.log(error);
        setvideoUploadFailure(true);
      })
  }

  const removeImage = () => {
    setImageToPost(null);
    setImageToSend(null);
  };
  const removeVideo = () => {
    setVideoToPost(null);
    setVideoToSend(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!inputRef.current) return;
    if(videoToSend) await sendVideo();
    if(videoToSend&&(videoId.current==null)) return;
    const formData = new FormData();
    formData.append("file",imageToSend);
    formData.append("title",inputRefTitle.current.value);
    formData.append("content", inputRef.current.getContent());
    formData.append("tags", inputRefTags.current.value);
    formData.append("description", inputRefDesc.current.value);
    formData.append("video", videoId.current);
    formData.append("author", session?.user.name);
    formData.append("email", session?.user.email);
    formData.append("profilePic", session?.user.image);
    axios.post(BACKEND_API_ENDPOINT,formData,{
      headers:{
        Accept:"application/json" 
      },})
      .then((response)=>{
        inputRef.current.setContent('<p><span style="font-size:36pt;">Title goes here...</span></p><p>Content goes here...</p>');
        inputRef.current.value = "";
        inputRefTitle.current.value = "";
        inputRefTags.current.value = "";
        inputRefDesc.current.value = "";
        //dispatch(addPost(response.data));
        removeImage();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setpostAdded(true);
        dispatch(setStoreTime(1));
      })
      .catch((error)=>{
        console.log(error);
        setpostAddedFailure(true);
      })
  }

  return (
    <div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
        <div className='pt-2 flex items-center pl-5 space-x-1'>
            <img src={session?.user.image} height={40} width={40} alt="profilePic" className=" top-2 rounded-full border border-gray-300 "
             >
            </img>
            <p className=' px-8 text-3xl text-center'>Adding new post as: {session?.user.name}</p>
         </div>
        <div className='p-4 pt-5   space-x-2'>
            <form className='flex flex-col space-y-2 pr-2'>
              <div>
                  <label className="block pl-4 text-sm font-medium text-gray-500 ">Title</label>
                  <input id="title" className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                   ref={inputRefTitle}
                   placeholder={`Title:`}>
                  </input> 
              </div>
              <div>
                <label className="block pl-4 text-sm font-medium text-gray-500 ">Description</label>
                <input className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                  ref={inputRefDesc}
                  placeholder={`Description:`}>
                </input> 
              </div>

              <div>
                <label className="block pl-4 text-sm font-medium text-gray-500 ">Tags separated by &apos;,&apos;</label>
                <input className='rounded-xl h-12 w-full focus:outline-none font-medium bg-gray-100 px-4' type="text"
                ref={inputRefTags}
                placeholder={`Tags:`}>
                </input>  
              </div>
            </form>
        </div>
        <div className='flex'>
          {imageToPost&&(
            <div 
              onClick={removeImage}
              className='flex items-center px-4 py-1 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'>
              <img src={imageToPost} alt="postImage"  className='h-20 object-contain'></img>
              <RiDeleteBin6Line className='h-8 hover:text-red-500'/>
            </div>)}
          {videoToPost&&(
            <div 
              onClick={removeVideo}
              className='flex items-center px-4 py-1 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'>
              <video alt="videoImage" className='h-20 object-contain' controls >
                    <source src={videoToPost}></source>
                  </video>
              <RiDeleteBin6Line className='h-8 hover:text-red-500'/>
            </div>)}
        </div>
        <div className='flex justify-evenly py-2 '>
          <div 
            onClick={handleClickVideo}
            className='flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer'> 
            <HiOutlineVideoCamera size={20} className="text-red-500"/>
            <p className='font-semibold text-gray-600 '>Add Video </p>
            <input onChange={addVideoToPost} type="file" ref={hiddenVideoInput} hidden accept="video/mp4,video/x-m4v,video/*"></input>
          </div>
          <div 
            onClick={handleClick}
            className='flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer'> 
            <IoMdPhotos size={20} className="text-green-500"/>
            <p className='font-semibold text-gray-600 '>Add Main Photo</p>
            <input onChange={addImageToPost} type="file" ref={hiddenFileInput} hidden accept='image/*'></input>
          </div>
        </div>
          <RichTextEdit onChange={editorChange} ref={inputRef}/>
          <div className='flex flex-col px-3 py-5 '>
          <button className='rounded-md bg-gray-300 hover:bg-gray-400 hover:text-gray-600 cursor-pointer text-gray-500 h-10 text-lg font-bold' onClick={handleSubmit}>Add Post</button>
        </div>
        {postAdded &&(<DialogBox messageHead="Post added successfully!" message="Post was added successfully, you can add other post or go to homepage." handleSucces={handleSucces}/>)}
        {postAddedFailure &&(<DialogBox messageHead="Post add attempt FAILURE" message="Post was NOT added, make sure main image is added and its size is less than 1MB." handleSucces={handleSucces}/>)}
        {videoUploadFailure &&(<DialogBox messageHead="Video upload FAILURE" message="Try once again, if this problem reoccurs file size might be too big." handleSucces={handleSucces}/>)}
        <BottomOfThePage/>
    </div>
  )
}

export default CreatePost 