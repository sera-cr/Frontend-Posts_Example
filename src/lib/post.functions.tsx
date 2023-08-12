import { Post } from "@/store/postSlice";
import { cookiesGet } from "./cookies.functions";

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

export async function editPostQuery(id: number, title: string, content: string, published: boolean): Promise<any> {
  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}posts/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": title,
        "content": content,
        "published": published
      })
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function editPostStore(id: number, title: string, content: string, published: boolean) {
  const res = await editPostQuery(id, title, content, published);

  const data = res["result"];

  if (res["status"] === 200) {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      published: data.published,
      updatedAt: data.updatedAt
    }
  } else {
    return {
      id: -1,
      title: "",
      content: "",
      published: false,
      updatedAt: ""
    }
  }
}

export async function createPostQuery(title: string, content: string, published: boolean): Promise<any> {
  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}posts/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": title,
        "content": content,
        "published": published
      })
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function createPostStore(title: string, content: string, published: boolean): Promise<any> {
  const res = await createPostQuery(title, content, published);

  const data = res["result"];

  if (res["status"] === 200) {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      published: data.published,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
      name: data.author.name,
      authorId: data.author.id,
      email: data.author.email
    } as Post;
  } else {
    return {
      id: -1,
      title: "",
      content: "",
      published: false,
      updatedAt: "",
      createdAt: "",
      name: "",
      authorId: -1,
      email: ""
    } as Post;
  }
}

export async function deletePostQuery(id: number): Promise<any> {
  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}posts/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      }
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function deletePostStore(id: number): Promise<any> {
  const res = await deletePostQuery(id);
}