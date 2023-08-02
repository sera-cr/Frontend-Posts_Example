'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik';
import styles from './page.module.scss';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useRouter } from 'next/navigation'
import { cookiesCreate } from '../../lib/cookies.functions';
import { User, logIn } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { loginCredentials } from './login.funtions';

interface Values {
  email: string;
  password: string;
}

export default function Login() {

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const onClickLogIn = async (email: string, password: string) => {
    const response = await loginCredentials(email, password);

    if (response["status"] === 400) {
      toast.error(response["result"]);
    } else if (response["status"] === 200) {
      const result = response["result"];

      dispatch(logIn(
        {
          id: result["id"],
          email: result["email"],
          name: result["name"],
          role: result["role"],
        } as User
      ));
      
      cookiesCreate("accessToken", result["accessToken"], true, "/");

      toast.info("Login successful.")
      
      router.replace("/home/");
    } else {
      toast.error("An unidentified error occurred.");
    }
  }

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

          onSubmit={async (
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setSubmitting(false);
            onClickLogIn(values.email, values.password);
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
              <button type="submit" className={styles.login_button + " text-white fw-bold btn btn-lg btn-primary center"}>Log In</button>
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