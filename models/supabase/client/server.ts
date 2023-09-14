import { GetServerSidePropsContext } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../generated-types'

export const getSupabaseServerClient = (ctx: GetServerSidePropsContext) => {
  return createPagesServerClient<Database>(ctx)
}
