import { User, logIn } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

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