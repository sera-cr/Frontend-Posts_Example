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
  const [profileId, setProfileId] = useState<number>(-1);

  const handleSetBio = (bio: string) => setBio(bio);
  const handleSetProfileId = (id: number) => setProfileId(id);

  useEffect(() => {
    (async () => {
      if ((profile.id === -1)) {
        const res = await getBioStore(currentUser.uid);

        dispatch(insertBio(res));

        handleSetBio(res.bio);
        handleSetProfileId(res.id);
      } else {
        handleSetBio(profile.bio);
        handleSetProfileId(profile.id);
      }
    }) ()
  }, [])

  useEffect(() => {
    if (profile.bio !== bio) {
      handleSetBio(profile.bio);
    }
    console.log(profile.bio);
  })

  return (
    <ProfileCard
      name={currentUser.name}
      email={currentUser.email}
      bio={bio}
      uid={currentUser.uid}
      profileId={profileId}
    />
  )
}
