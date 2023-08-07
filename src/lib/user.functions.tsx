import { cookiesGet } from "./cookies.functions";

export async function getUser(): Promise<any> {

  const cookie = await cookiesGet("accessToken");
  
  if (cookie) {
    const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}users/credentials`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + cookie["value"],
        'Content-Type': 'application/json',
      },
    })
  
    if (res.ok) {
      const body = await res.json();
    
      return {"status": res.status, "result": body}
    }
  }
  
  return {"status": 401, "result": "Invalid access token."}
}

export async function loginCredentials(email: string, password: string): Promise<any> {
  const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}users/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "email": email,
        "password": password
      }
    )
  });

  if (res.ok) {
    const body = await res.json();

    return {"status": res.status, "result": body};
  } else {
    return {"status": res.status, "result": "Invalid email or password."};
  }
}

export async function registerUser(email: string, name:string, password: string): Promise<any> {
  const res = await window.fetch(`${process.env.NEXT_PUBLIC_API_PATH}users/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "email": email,
        "name": name,
        "password": password
      }
    )
  });

  const body = await res.json();

  return {"status": res.status, "result": body};
}