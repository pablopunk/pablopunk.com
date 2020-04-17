import React from 'react'
import { GetServerSideProps } from 'next'
import { fetchData } from '../../lib/api'
import localeFromRequest from '../../lib/locales'

export const serverSideProps = async (ctx, pageName: string) => {
  const data = await fetchData(pageName, {
    locale: localeFromRequest(ctx.req),
    preview: ctx.preview,
  })

  return {
    props: {
      ...data[pageName],
    },
  }
}
