import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:"post",
    initialState:{
        value:[],
        topPosts:[]
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
        addTopPosts: (state,action) => {
            const postsArray = [...action.payload];
            state.topPosts = postsArray;
        },
    },
});

export const {addAllPost, addPost, addTopPosts, deletePost} = postSlice.actions;
export const  selectPost = (state)=> state.post.value;
export const  selectTopPosts = (state)=> state.post.topPosts;
export default postSlice.reducer;