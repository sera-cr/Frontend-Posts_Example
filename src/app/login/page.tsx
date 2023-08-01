'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik';
import styles from './page.module.scss';
import Link from 'next/link';

interface Values {
  email: string;
  password: string;
}

export default function Login() {
  return (
    <main className={styles.main}>
      <h1 className={styles.logo + ' fw-bold mb-5'}>Post-That!</h1>
      <div className={styles.login_box +
        ' d-flex flex-column justify-content-center align-items-center p-5 rounded-3 bg-white'}>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form>
            <div className='mb-4'>
              <label className='form-label fs-6 display-6'>Email</label>
              <Field id="email" className={styles.login_input + " form-control"} name="email" placeholder="e.g. john@email.com" />
            </div>

            <div className='mb-5'>
              <label className='form-label fs-6 display-6'>Password</label>
              <Field type="password" className="form-control" id="password" name="password" placeholder="e.g. ilovemangos123" />
            </div>

            <div className='mt-5 d-grid gap-2'>
              <button type="submit" className={styles.login_button + " text-white fw-bold btn btn-lg btn-primary center"}>Sign In</button>
            </div>

            <div className='mt-7 mb-0'>
              <label className='form-label fs-6'>Don't have account? <Link href="/register" className='link-opacity-50-hover link-primary link-underline-opacity-100'>Register Now!</Link></label>
            </div>
          </Form>
        </Formik>
      </div>
      
    </main>
  )
}

/*
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
*/
