import "./variables.scss";
import './style.scss'
import 'bootstrap/dist/css/bootstrap.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from "@/store/provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";
import "bootstrap-icons/font/bootstrap-icons.css";

const inter = Inter({ subsets: ['latin'] })

const DynamicBootstrap = dynamic(
  () => require('bootstrap/dist/js/bootstrap.min.js'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Post-That!',
  description: 'Post-That! - A new social media based on posts. Frontend posts example.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        theme='light'
      />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
