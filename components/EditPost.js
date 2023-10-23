import React from 'react'
import { useSession, } from 'next-auth/react';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoMdPhotos } from "react-icons/io";
import { useRef, useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import RichTextEdit from './RichTextEdit';
import BottomOfThePage from './BottomOfThePage';
import DialogBox from './DialogBox';
import PostInputFields from './PostInputFields';
import { deleteVideo } from '@/actions/videoActions';
import { dialogBoxMessages } from '@/constants/dialogBoxMessages';
import LoadingCircle from './LoadingCircle';

const EditPost = ({postId}) => {
    const GET_POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts/${postId}`;
    const EDIT_POST_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/posts`;
    const VIDEO_BACKEND_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video`;
    const VIDEO_STREAM_API_ENDPOINT=`${process.env.NEXT_PUBLIC_PAGE_BASEURL}api/v1/video/stream/`;
    const {data: session} = useSession();
    const [post, setpost] = useState(null);
    const [imageToPost, setImageToPost] = useState(null);
    const [imageToSend, setImageToSend] = useState(null);
    const [videoToPost, setVideoToPost] = useState(null);
    const [videoToSend, setVideoToSend] = useState(null);
    const [editorState, seteditorState] = useState(false);
    const [loading, setloading] = useState(false);
    const prevVideoId = useRef(null);
    const currentVideoId = useRef(null);
    const inputRefContent = useRef(null);
    const inputRefTitle = useRef(null);
    const inputRefTags = useRef(null);
    const inputRefDesc = useRef(null);
    const hiddenFileInput = useRef(null);
    const hiddenVideoInput = useRef(null);
    {/*Fetch post to edit*/}
    useEffect(()=>{
      const fetchData = async () =>{
        setloading(true)
        await axios.get(GET_POST_API_ENDPOINT)
        .then((response)=>{
          setpost(response.data);
          setImageToPost(response.data.image);
          currentVideoId.current = response.data.video;
          prevVideoId.current = response.data.video;
          setVideoToPost(currentVideoId.current!=null&&currentVideoId.current!="null"?VIDEO_STREAM_API_ENDPOINT+currentVideoId.current:null);
        }).catch((error)=>{
          console.log(error);
          setdialogBoxMessage(dialogBoxMessages.singlePostFetchFailure);
          setdialogBoxOpen(true);
        });
        setloading(false)
      };
      fetchData();
    },[]);
  
  {/*Dialog box states*/} 
  const [dialogBoxMessage, setdialogBoxMessage] = useState(null);
  const [dialogBoxOpen, setdialogBoxOpen] = useState(false);

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
  const removeVideo = () => {
    setVideoToPost(null);
    setVideoToSend(null);
    currentVideoId.current=null;
  };
  const removeImage = () => {
    setImageToPost(null);
    setImageToSend(null);
  };
  const validInputFields = () => {
    if (videoToSend&&(currentVideoId.current==null)) return false; //IF VIDEO UPLOAD FAILED - RETURN
    else if (imageToSend==null&&imageToPost==null) {
      setdialogBoxMessage(dialogBoxMessages.pleaseUploadMainImage);
      setdialogBoxOpen(true); 
      return false; //IF NO MAIN IMAGE - RETURN
    }
    else if ((inputRefTitle.current.value=="") 
      ||(inputRefTags.current.value=="")
      ||(inputRefDesc.current.value=="") 
      ||(inputRefContent.current==false)) {
        setdialogBoxMessage(dialogBoxMessages.pleaseFillAllFields);
        setdialogBoxOpen(true); 
        return false; //IF INPUT FIELDS BLANK - RETURN
    }
    else return true;
 }
  const sendVideo = async () => {
    const formDataVideo = new FormData();
    formDataVideo.append("video",videoToSend);
    await axios.post(VIDEO_BACKEND_API_ENDPOINT,formDataVideo,{
      headers:{
          Accept:"application/json",
          "Access-Control-Allow-Origin":'*'
      },})
      .then((response)=>{
        currentVideoId.current = response.data;
      })
      .catch((error)=>{
        console.log(error);
        setdialogBoxMessage(dialogBoxMessages.videoUploadFailure);
        setdialogBoxOpen(true);
    })
  }
  {/*SUBMIT CHANGES BUTTON ON CLICK*/}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if(session?.user.email!=post.email) {
      setdialogBoxMessage(dialogBoxMessages.noPermissionToModify);
      setdialogBoxOpen(true);
      return;
    }
    if(videoToSend){await sendVideo();}
    if (!validInputFields()) {
      setloading(false);
      return;
    }
    const formData = new FormData();
    formData.append("id",post?.id);
    formData.append("image",imageToSend);
    formData.append("title",inputRefTitle.current.value);
    formData.append("content", inputRefContent.current.getContent());
    formData.append("tags", inputRefTags.current.value);
    formData.append("description", inputRefDesc.current.value);
    formData.append("author", post?.author); //.split("(edited)")[0] +"(edited by: " + session?.user.name+")")
    formData.append("email", session?.user.email);
    formData.append("video", currentVideoId.current);
    formData.append("profilePic", post?.profilePic);

    axios.put(EDIT_POST_API_ENDPOINT,formData,{
      headers:{
        Accept:"application/json" 
      },})
      .then((response)=>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setloading(false);
        //If new video sent - delete previous video when POST EDIT SUCCES
        if(currentVideoId.current!=prevVideoId.current&&prevVideoId.current!=null)deleteVideo(prevVideoId.current);
        prevVideoId.current = currentVideoId.current;
        setdialogBoxMessage(dialogBoxMessages.postEditSuccess);
        setdialogBoxOpen(true);
      })
      .catch((error)=>{
        console.log(error);
        setloading(false);
        //If new video send - delete that video when POST EDIT ERROR
        if(currentVideoId.current!=prevVideoId.current)deleteVideo(currentVideoId.current);
        setdialogBoxMessage(dialogBoxMessages.postEditFailure);
        setdialogBoxOpen(true);
      })
  }

  return (
    <div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
        {/*Current USER DETAILS*/}
        <div className='pt-2 flex items-center pl-5 space-x-1'>
            <img src={session?.user.image} height={40} width={40} alt="profilePic" className=" top-2 rounded-full border border-gray-300 ">
            </img>
            <p className=' px-8 text-3xl text-center'>Editing post as: {session?.user.name}</p>
        </div>
        {/*TITLE | DESCRIPTION | TAGS INPUT FIELDS */}
        {post?.title&&(<PostInputFields inputRefTitle={inputRefTitle} inputRefDesc={inputRefDesc} inputRefTags={inputRefTags} 
          defaultTitle={post?.title} defaultDescription={post?.description} defaultTags={post?.tags}/>)}
        {/*CURRENT POST IMAGE & VIDEO MINIATURES*/}
        <div className='flex'>
          {imageToPost&&(
            <div 
              onClick={removeImage}
              className='flex items-center px-4 py-1 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'>
              <img src={imageToPost} alt="postImage"  className='h-16 object-contain'></img>
              <RiDeleteBin6Line className='h-8 hover:text-red-500'/>
            </div>)}
          {videoToPost&&(
            <div
              onClick={removeVideo}
              className='flex items-center px-4 py-1 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'>
              <video alt="videoImage" className='h-16 object-contain' controls >
                    <source src={videoToPost}></source>
                  </video>
              <RiDeleteBin6Line className='h-8 hover:text-red-500'/>
            </div>)}
        </div>
        {/*ADD VIDEO | IMAGE BUTTONS*/}
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
          {/*RICH TEXT EDITOR*/}
        <RichTextEdit postContent={post?.content} onChange={editorChange} ref={inputRefContent}/>
          {/*SUBMIT BUTTON*/}
        <div className='flex flex-col px-3 py-5 '>
            <button className='rounded-md bg-gray-300 hover:bg-gray-400 hover:text-gray-700 cursor-pointer text-gray-600 h-10 text-lg font-bold' onClick={handleSubmit}>
            Update Post</button>
        </div>
        {loading&&(<LoadingCircle className="text-center absolute left-0 top-1/2 right-0  z-50 m-auto"/>)}
          {/*Dialog Boxes*/}
        {dialogBoxOpen &&(<DialogBox messageHead={dialogBoxMessage?.messageHead} message={dialogBoxMessage?.message} handleSucces={()=>setdialogBoxOpen(false)}/>)}
        <BottomOfThePage/>
    </div>
  )
}

export default EditPost 