'use client'

import styles from './page.module.scss';

export default function Loading() {
  return (
    <main className={styles.main + " d-flex flex-column justify-content-center align-items-center"}>
      <div className='spinner-border text-white' style={{ width: "3rem", height: "3rem" }} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </main>
  )
}