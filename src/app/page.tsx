import { redirect } from 'next/navigation'
import { cookiesHas } from './lib/cookies.functions'

export default async function Main() {
  if (! await cookiesHas("email") || ! await cookiesHas("accessToken")) {
    redirect('/login')
  } else {
    redirect('/home');
  }
}