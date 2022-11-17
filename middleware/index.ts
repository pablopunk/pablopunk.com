import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
} from 'next'
import { PageProps } from '@types/page'
import { i18nStaticProps } from './i18n'

export const withAdminServerSideProps: GetServerSideProps<PageProps> = async (
  ctx: GetServerSidePropsContext,
) => {
  const result = await withPageAuth({ redirectTo: '/login' })(ctx)
  if (!result?.props?.user) {
    return result
  }

  const { user } = result.props
  if (user?.id !== process.env.SUPABASE_ADMIN_USER_ID) {
    return {
      redirect: {
        permanent: false,
        destination: '/unauthorized',
      },
    }
  }

  return {
    props: {
      ...(await i18nStaticProps(ctx)),
    },
  }
}

export const pageStaticProps = async (
  ctx: GetStaticPropsContext,
): Promise<{ props: any }> => {
  return {
    props: {
      ...(await i18nStaticProps(ctx)),
    },
  }
}
