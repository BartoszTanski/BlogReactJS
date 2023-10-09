import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:"post",
    initialState:{
        value:[],
        topPosts:[],
        updateTime: 1,
        storeTime: 1,
    },
    reducers:{
        addPost:(state, action) =>{
            state.value.unshift(action.payload);
        },
        addAllPost: (state,action) => {
            const postsArray = action.payload;
            state.value = [...state.value, ...postsArray];

        },
        deletePost:(state, action) =>{
            let id  = action.payload;
            state.value=state.value.filter(item => item.id !== (id+""));
        },
        setUpdateTime:(state, action) =>{
            // let { id } = action.payload;
            //const index = state.map(item => item.id).indexOf(id);
            //state.value[index] = action.payload;
            state.updateTime=(action.payload);
        },
        setStoreTime:(state, action) =>{
            // let { id } = action.payload;
            //const index = state.map(item => item.id).indexOf(id);
            //state.value[index] = action.payload;
            state.storeTime=(state.storeTime+action.payload) ;
        },
        addTopPosts: (state,action) => {
            const postsArray = [...action.payload];
            state.topPosts=postsArray;
        },
    },
});

export const {addAllPost,addPost,addTopPosts,setUpdateTime,setStoreTime, deletePost} = postSlice.actions;
export const  selectPost = (state)=> state.post.value;
export const  selectTop = (state)=> state.post.topPosts;
export const  selectUpdateTime = (state)=> state.post.updateTime;
export const  selectStoreTime = (state)=> state.post.storeTime;
export default postSlice.reducer;