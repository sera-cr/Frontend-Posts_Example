'use client'

import { useEffect, useState } from "react"
import ProfileCard from "./profileCard"
import { AppDispatch, useAppSelector } from "@/store/store";
import { getBioStore } from "@/lib/bio.functions";
import { useDispatch } from "react-redux";
import { insertBio } from "@/store/bioSlice";

export default function Profile() {
  
  const currentUser = useAppSelector((state) => state.allReducers.auth.value);

  const profile = useAppSelector((state) => state.allReducers.bio.value);

  const dispatch = useDispatch<AppDispatch>();

  const [bio, setBio] = useState<string>("");

  const handleSetBio = (bio: string) => setBio(bio);

  useEffect(() => {
    (async () => {
      if ((profile.id === -1)) {
        const res = await getBioStore(currentUser.uid);

        dispatch(insertBio(res));

        handleSetBio(res.bio);
      } else {
        handleSetBio(profile.bio);
      }
    }) ()
  }, [])

  return (
    <ProfileCard
      name={currentUser.name}
      email={currentUser.email}
      bio={bio}
    />
  )
}
