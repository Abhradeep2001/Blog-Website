import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth,database } from "../config/firebase-config";
import { useEffect, useState } from "react";
import {useAuthState} from "react-firebase-hooks/auth";

export const Home=()=>{

    //Storing information about current user who logged in
    const [userInfo]=useAuthState(auth);

    //State containing the List of 'Posts' from our database
    const [postList,setPostList]=useState([]);

    //Reference to our collection in the database
    const postRef=collection(database,"userposts");

    //Function to get Posts from our database(i.e read the document from our collection)
    const getPost= async() =>{
        const postData=await getDocs(postRef);
        //mapping through every document of the collection and 
        //extracting data from the doc and adding it to a new object along with the id
        setPostList(postData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })));
    }

    //Function to delete Posts
    const deletePost = async(id) =>{
        //To specifically get the doc which we want to delete
        const docToDelete= doc(database,"userposts", id)
        await deleteDoc(docToDelete);
    }

    useEffect(() => {

        getPost();

    }, []);


    return(
        <div className="homePage">
        {postList.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h2> {post.title}</h2>
              </div>
              <div className="deletePost">
                {userInfo && post.author.id === userInfo?.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.description} </div>
            <h3>@{post.author.authorName}</h3>
          </div>
        );
      })}
    </div>

    )
}