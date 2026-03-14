import { NextRequest } from 'next/server'

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'parta2025'
export const SESSION_COOKIE = 'admin_session'
const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'admin-session-parta2025'

export function getSessionToken(): string {
  return SESSION_TOKEN
}

export function isAdminRequest(request: NextRequest): boolean {
  const cookie = request.cookies.get(SESSION_COOKIE)
  return cookie?.value === SESSION_TOKEN
}
