'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik';
import styles from './page.module.scss';
import { registerUser } from './register.functions';
import { ToastContainer, toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation'

interface Values {
  email: string;
  name: string;
  password: string;
}

export default function Login() {

  const router = useRouter()

  return (
    <main className={styles.main}>
      <h1 className={styles.logo + ' fw-bold mb-5'}>Post-That!</h1>
      <div className={styles.login_box +
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
            const response = await registerUser(values.email, values.name, values.password);
            if (response["status"] === 200) {
              setSubmitting(true);

              router.replace("/login");
            } else if (response["status"] == 409) {
              toast.error("Email already in use.");
              resetForm();
            } else {
              toast.error("An error occurred.");
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <div className='mb-4'>
              <label className='form-label fs-6 display-6'>Email</label>
              <Field id="email" className={styles.login_input + " form-control"} name="email" placeholder="e.g. john@email.com" />
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
              <button type="submit" className={styles.login_button + " text-white fw-bold btn btn-lg btn-primary center"}>Sign Up!</button>
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        theme='light'
      />
    </main>
  )
}