import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export function getSession() {
    const session = cookies().get('session')?.value;
    return session ? session : null;
}

export function middleware(request: NextRequest) {
    const session = getSession();

    if (request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    // If there is a session, redirect to the root '/'
    // if (session) {
    //     if (request.nextUrl.pathname !== '/') {
    //         return NextResponse.redirect(new URL('/', request.url));
    //     }
    // } else {
    //     // If there is no session, redirect to either '/signin' or '/signup'
    //     if (!request.nextUrl.pathname.startsWith('/signin') && !request.nextUrl.pathname.startsWith('/signup')) {
    //         return NextResponse.redirect(new URL('/signin', request.url));
    //     }
    // }
}

export const config = {
    matcher: ['/'],
};
