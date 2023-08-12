'use client'

import { useEffect, useState } from "react";
import Card from "../card/card";
import LoadingCard from "../card/loadingCard";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { getAllUsersPostsStore } from "@/lib/post.functions";
import { insertUserPost } from "@/store/postSlice";


export default function MyPosts() {

  const [loadingCards, setLoadingCards] = useState(true);
  const [postUserInfo, setPosts] = useState<Array<any>>([]);
  
  const handleLoadingCards = (value: boolean) => setLoadingCards(value);
  const handleSetUserPosts = (posts: any[]) => setPosts(posts);

  const userPosts = useAppSelector((state) => state.allReducers.posts.userPosts);

  const currentUser = useAppSelector((state) => state.allReducers.auth.value);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const posts: Array<any> = new Array();

    (async () => {
      if (userPosts.length <= 0) {
        const postsList = await getAllUsersPostsStore(currentUser);

        postsList.forEach((post, index) => {
          dispatch(insertUserPost(post));
          posts.push(post);
        })
        posts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
      } else {
        userPosts.forEach((post, index) => {
          if (!posts.find((element) => element.id === post.id)) {
            posts.push(post);
          }
        })
      }
    }) ()    
    handleLoadingCards(false);
    handleSetUserPosts(posts);
  }, [])

  useEffect(() => {
    userPosts.forEach((post, index) => {
        postUserInfo.push(post);
    })
  }, [postUserInfo])

  const cardsLoading = Array.from({length: 3}, (_, index) => {
    return (
      <LoadingCard
        key={index}
      />
    )
  })

  const cardsLoaded = Array.from(postUserInfo, (post, index) => {
    postUserInfo.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    return (
      <div
        className="col-md-8 offset-md-2"
        key={`card_${index}`}>
        <Card
          userPost={true}
          canEdit={currentUser.uid === post.authorId}
          canDelete={(currentUser.uid === post.authorId) || (currentUser.isAdmin)}
          postId={post.id}
        />
      </div>
    )
  })

  return (
    <div className="mt-8 container" style={{ overflow: "hidden"}}>
      {loadingCards ?
        cardsLoading
        :
        cardsLoaded
      }
    </div>
  )
}
