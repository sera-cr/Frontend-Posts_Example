import { Bio } from "@/store/bioSlice";
import { cookiesGet } from "./cookies.functions";

export async function getBioById(id: number): Promise<any> {
  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}profiles/${id}`, {
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

export async function getBioStore(id: number) {
  const res = await getBioById(id);

  const data = res["result"];

  if (res["status"] === 200) {
    return {
      id: data.id,
      uid: id,
      bio: data.bio
    } as Bio;
  } else {
    return {
      id: -1,
      uid: id,
      bio: ""
    }
  }
}

export async function updateBio(id: number, bio: string): Promise<any> {
  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}profiles/${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        "bio" : bio
      }),
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function updateBioStore(id: number, bio: string): Promise<any> {
  const res = await updateBio(id, bio);

  const data = res["result"];

  if (res["status"] === 200) {
    return {
      id: data.id,
      uid: id,
      bio: data.bio
    } as Bio;
  } else {
    return {
      id: -1,
      uid: id,
      bio: ""
    }
  }
}

export async function createBio(id: number, bio: string): Promise<any> {
  const cookie = await cookiesGet("accessToken");

  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}profiles/${id}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        "bio" : bio
      }),
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
    })

    const body = await res.json();

    return {"status": res.status, "result": body};
  }
}

export async function createBioStore(id: number, bio: string): Promise<any> {
  const res = await createBio(id, bio);

  console.log("res");

  const data = res["result"];

  if (res["status"] === 200) {
    return {
      id: data.id,
      uid: id,
      bio: data.bio
    } as Bio;
  } else {
    return {
      id: -1,
      uid: id,
      bio: ""
    }
  }
}