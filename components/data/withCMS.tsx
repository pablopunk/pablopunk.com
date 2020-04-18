import React from 'react'
import { GetServerSideProps } from 'next'
import { fetchData } from '../../lib/api'
import localeFromRequest from '../../lib/locales'

export const serverSideProps = async (ctx, pageName: string) => {
  const locale = localeFromRequest(ctx.req)
  const data = await fetchData(pageName, {
    preview: ctx.preview,
    locale,
  })

  return {
    props: {
      ...data[pageName],
      locale,
    },
  }
}
