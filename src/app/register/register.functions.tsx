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