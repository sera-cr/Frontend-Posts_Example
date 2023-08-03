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