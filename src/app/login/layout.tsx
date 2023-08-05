'use client'

import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { getUser } from "@/lib/user.functions";
import { User, logIn } from "@/store/authSlice";
import { useLayoutEffect, useState } from "react";
import Loading from "./loading";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (isAuth) {
      router.replace("/home/");
    } else {
      (async () => {
        const res = await getUser();
  
        if (res["status"] === 200) {
          const result = res["result"];

          dispatch(logIn(
            {
              id: result["id"],
              email: result["email"],
              name: result["name"],
              role: result["role"],
            } as User
          ));

          router.replace("/home/");
        } else {
          setLoading(false);
        }
      })();
    }
  }, [])

  return (
    <div>
      {loading ?
        <div className="d-flex flex-direction-column justify-content-center align-items-center">
          <Loading />
        </div>
        :
        <div>
          {children}
        </div>
        }
    </div>
  )
}