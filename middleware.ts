import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
export function getSession() {
    const session = cookies().get('session')?.value;
    return session ? session : null;
  }

export function middleware(request: NextRequest) {
  const session = getSession();
  if (session && request.nextUrl.pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session && request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  if (!session && !request.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.rewrite(new URL('/signin', request.url));
  }
}
export const config = {
  matcher: ['/', '/profile', '/signin', '/signup'],
};