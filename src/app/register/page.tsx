'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik';
import styles from './page.module.scss';
import { registerUser } from './register.functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useRouter } from 'next/navigation'
import { AppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { getUser } from '@/lib/user.functions';
import { User, logIn } from '@/store/authSlice';
import { useDispatch } from 'react-redux';

interface Values {
  email: string;
  name: string;
  password: string;
}

export default function Login() {

  const router = useRouter();

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
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
        }
      })();
    }
  })

  const onClickSignUp = async (email: string, name: string, password: string) => {
    const response = await registerUser(email, name, password);

    if (response["status"] === 200) {
      toast.info("Your accout has been successfully created!")

      router.replace("/login");
    } else if (response["status"] == 409) {
      toast.error("Email already in use.");
      return false;
    } else {
      toast.error("An unidentified error occurred.");
      
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.logo + ' fw-bold mb-5'}>Post-That!</h1>
      <div className={styles.signup_box +
        ' d-flex flex-column justify-content-center align-items-center p-5 rounded-3 bg-white'}>
        <h2 className='fs-3 fw-light mb-3'>Create an account</h2>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: ''
          }}

          onSubmit={async (
            values: Values,
            { setSubmitting, resetForm }: FormikHelpers<Values>
          ) => {
            setSubmitting(false);
            onClickSignUp(values.email, values.name, values.password);
            resetForm();
          }}
        >
          <Form>
            <div className='mb-4'>
              <label className='form-label fs-6 display-6'>Email</label>
              <Field id="email" className={styles.signup_input + " form-control"} name="email" placeholder="e.g. john@email.com" />
            </div>

            <div className='mb-4'>
              <label className='form-label fs-6 display-6'>Name</label>
              <Field className="form-control" id="name" name="name" placeholder="e.g. john cena" />
            </div>

            <div className='mb-5'>
              <label className='form-label fs-6 display-6'>Password</label>
              <Field type="password" className="form-control" id="password" name="password" placeholder="e.g. ilovemangos123" />
            </div>

            <div className='mt-5 d-grid gap-2'>
              <button type="submit" className={styles.signup_button + " text-white fw-bold btn btn-lg btn-primary center"}>Sign Up!</button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  )
}