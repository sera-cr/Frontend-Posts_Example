'use server'

import { cookies } from 'next/headers';

export async function cookiesCreate(name: string, value: string, httpOnly: boolean, path: string) {
  cookies().set({
    name: name,
    value: value,
    httpOnly: httpOnly,
    path: path
  });
}

export async function cookiesGet(name: string) {
  return cookies().get(name);
}

export async function cookiesHas(name: string) {
  return cookies().has(name);
}

export async function cookiesDelete(name: string) {
  return cookies().delete(name);
}