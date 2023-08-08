import { Post } from "@/store/postSlice";
import { cookiesGet } from "./cookies.functions";
import { getUserByIdStore } from "./user.functions";

export async function getAllPosts(): Promise<any> {

  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}users/posts`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function getAllPostsStore(currentUser: any) {
  const res = await getAllPosts();

  const allPosts = res["result"]["posts"];
  const result: Post[] = [];

  allPosts.forEach(async (post: any) => {
    const card = {
      id: post.id,
      name: post.author.name,
      email: post.author.email,
      title: post.title,
      content: post.content,
      canEdit: currentUser.uid === post.authorId,
      canDelete: (currentUser.uid === post.authorId) || (currentUser.isAdmin),
      published: post.published,
      postId: post.id,
      authorId: post.author.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    } as Post;

    result.push(card);    
  })

  return result;
}

export async function getAllUserPosts(currentUser: any): Promise<any> {

  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}users/${currentUser.uid}/posts`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function getAllUsersPostsStore(currentUser: any) {
  const res = await getAllUserPosts(currentUser);

  const allPosts = res["result"]["posts"];
  const result: Post[] = [];

  allPosts.forEach(async (post: any) => {
    const card = {
      id: post.id,
      name: currentUser.name,
      email: currentUser.email,
      title: post.title,
      content: post.content,
      canEdit: currentUser.uid === post.authorId,
      canDelete: (currentUser.uid === post.authorId) || (currentUser.isAdmin),
      published: post.published,
      postId: post.id,
      authorId: currentUser.uid,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    } as Post;

    result.push(card);    
  })

  return result;
}