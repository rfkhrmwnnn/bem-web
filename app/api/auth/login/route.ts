import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_COOKIE, getSessionToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      response.cookies.set(SESSION_COOKIE, getSessionToken(), {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        secure: process.env.NODE_ENV === 'production',
      })
      return response
    }

    return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Permintaan tidak valid.' }, { status: 400 })
  }
}
