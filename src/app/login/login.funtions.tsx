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

      return {"status": res.status, "result": body["accessToken"]};
    } else {
      return {"status": res.status, "result": "Invalid email or password."};
    }
}