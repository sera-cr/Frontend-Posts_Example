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

  const posts: Array<any> = new Array();

  useEffect(() => {
    (async () => {
      if (userPosts.length <= 0) {
        const postsList = await getAllUsersPostsStore(currentUser);

        postsList.forEach((post, index) => {
          dispatch(insertUserPost(post));
          posts.push(post);
        })
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

  const cardsLoading = Array.from({length: 3}, (_, index) => {
    return (
      <LoadingCard
        key={index}
      />
    )
  })

  const cardsLoaded = Array.from(postUserInfo, (post, index) => {
    return (
      <Card
        key={`card_${index}`}
        name={post.name}
        user={post.email}
        title={post.title}
        content={post.content}
        canEdit={currentUser.uid === post.authorId}
        canDelete={(currentUser.uid === post.authorId) || (currentUser.isAdmin)}
        published={post.published}
        postId={post.id}
      />
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

function getAllUserPostsStore(currentUser: { isAuth: boolean; email: string; name: string; uid: number; isAdmin: boolean; }) {
  throw new Error("Function not implemented.");
}
