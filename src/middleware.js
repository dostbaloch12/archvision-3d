import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      const login = request.nextUrl.clone()
      login.pathname = '/admin/login'
      return NextResponse.redirect(login)
    }
    return response
  }

  const secure = process.env.NODE_ENV === 'production'
  const supabase = createServerClient(url, anon, {
    cookieOptions: {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
    },
    cookies: {
      get(name) {
        return request.cookies.get(name)?.value
      },
      set(name, value, options) {
        response.cookies.set({
          name,
          value,
          ...options,
          httpOnly: true,
          secure,
          sameSite: 'lax',
          path: '/',
        })
      },
      remove(name, options) {
        response.cookies.set({
          name,
          value: '',
          ...options,
          httpOnly: true,
          secure,
          sameSite: 'lax',
          path: '/',
          maxAge: 0,
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !user) {
    const login = request.nextUrl.clone()
    login.pathname = '/admin/login'
    return NextResponse.redirect(login)
  }

  if (pathname === '/admin/login' && user) {
    const dashboard = request.nextUrl.clone()
    dashboard.pathname = '/admin'
    return NextResponse.redirect(dashboard)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
