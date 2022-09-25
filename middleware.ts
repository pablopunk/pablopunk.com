/* eslint-disable @next/next/no-server-import-in-page */
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = (request: NextRequest, event) => {
  if (request.nextUrl.pathname.startsWith('/dev')) {
    return withMiddlewareAuth({
      redirectTo: '/login',
      authGuard: {
        isPermitted: async (user) => {
          return user.sub === process.env.SUPABASE_ADMIN_USER_ID
        },
        redirectTo: '/unauthorized',
      },
    })(request, event)
  }

  return NextResponse.next()
}
