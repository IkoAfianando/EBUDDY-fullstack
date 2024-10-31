import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    // Add your authentication logic here
    const path = request.nextUrl.pathname;

    // Public paths that don't require authentication
    const publicPaths = ['/', '/login', '/register'];

    // Check if the path is public
    const isPublicPath = publicPaths.includes(path);

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value;

    // Redirect logic
    if (!token && !isPublicPath) {
        // Redirect to login if trying to access protected route without token
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && isPublicPath) {
        // Redirect to dashboard if trying to access public route with token
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};