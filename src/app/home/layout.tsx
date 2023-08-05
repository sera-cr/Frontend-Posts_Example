'use client'

import PageBar from "./pageBar/pageBar";
import VerticalBar from "./verticalBar/verticalBar";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { getUser } from "@/lib/user.functions";
import { User, logIn } from "@/store/authSlice";
import { useLayoutEffect, useState } from "react";
import Loading from "./loading";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    console.log(isAuth);
    if (!isAuth) {
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
          
          setLoading(false);
        } else {
          router.replace("/login/");
        }
      })();
    } else {
      setLoading(false);
    }
  });

  return (
    <div>
      {loading ?
        <Loading />
        :
        <main className="styles.main">
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <VerticalBar />
              <div className="col px-0">
                <div className="position-fixed">
                  <PageBar page={"Home"}/>
                </div>
                
                <div className="p-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
      }
    </div>
  )
}