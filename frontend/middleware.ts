import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req: request })
  
  // Define protected routes (exclude signin page)
  const protectedRoutes = ['/profile', '/dashboard']
  
  // Get the current path
  const { pathname } = request.nextUrl
  
  // Log the request
  console.log(`[${new Date().toISOString()}] Request: ${request.method} ${pathname}`)

  // Check if the route is protected and if the user is authenticated
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // Redirect to login if not authenticated
      console.log('Redirecting to signin due to unauthenticated access')
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }
  
  // Allow access to signin page even if not authenticated
  if (pathname === '/signin') {
    return NextResponse.next()
  }
  
  // Continue with the request
  return NextResponse.next()
}

// Configure which routes to apply the middleware to
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}