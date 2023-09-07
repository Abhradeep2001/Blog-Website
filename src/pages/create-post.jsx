import { useEffect, useState } from "react"
import { addDoc,collection } from "firebase/firestore";
import { database, auth } from "../config/firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreatePost=()=>{

    const navigate=useNavigate();

    //State variables to store user input
    const [postTitle,setPostTitle]=useState("");
    const [postText,setPostText]=useState("");

    //Reference to our collection in the database
    const postRef=collection(database,"userposts"); 

    //Storing information about the current User Who logged in
    const [userInfo]=useAuthState(auth);

    //Function to create a new Post
    const createPost= async()=>{
        //Adding data to our document to our collection by its reference
        await addDoc(postRef,{
            title: postTitle,
            description: postText,
            author :{
                authorName: userInfo?.displayName,
                id: userInfo?.uid,
            }
        })
        navigate("/");
    }

    useEffect(() => {
        //If user isn't authenticated redirect to the login page
        if(!userInfo)
            navigate("/login")
    },[] )

    return(
        <div className="createPostPage">
            <div className="cp-container">
                <h2><strong>Write your own Post !!</strong></h2>
                <div className="inputPost">
                    <label>Title: </label>
                    <input placeholder="Title..." onChange={(event)=> setPostTitle(event.target.value)}/>
                </div>
                <div className="inputPost">
                    <label>Description: </label>
                    <textarea placeholder="Describe your post..." onChange={(event)=> setPostText(event.target.value)}/>
                </div>
                <button className="submit-button" onClick={createPost}>Submit</button>
            </div>
        </div>
    )
}