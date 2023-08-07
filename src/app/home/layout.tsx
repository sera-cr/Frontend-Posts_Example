'use client'

import PageBar from "./pageBar/pageBar";
import VerticalBar from "./verticalBar/verticalBar";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from 'next/navigation';
import { getUser } from "@/lib/user.functions";
import { User, logIn } from "@/store/authSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import Loading from "./loading";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState("Home");

  const handleCurrentPage = (page: string) => setCurrentPage(page);

  const pathName = usePathname();

  useEffect(() => {  
    const route = pathName.match('([^/]*)$');
    let path = (route ? route[1].charAt(0).toUpperCase() + route[1].slice(1) : 'Home');
    path = path.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    handleCurrentPage(path);
  })

  useLayoutEffect(() => {

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
                  <PageBar page={currentPage}/>
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