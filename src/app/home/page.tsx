'use client'

import { redirect, useRouter } from "next/navigation";
import { cookiesDelete, cookiesGet } from "../../lib/cookies.functions";
import styles from "./page.module.scss";

export default function Home() {

  return (
    <main className={styles.main}>
      <p>a</p>
    </main>
  )
}