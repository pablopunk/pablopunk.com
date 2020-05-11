import React from 'react'
import { fetchData } from '../../lib/api'

export const staticProps = async (
  pageName: string,
  { params, preview = false }
) => {
  const data = await fetchData(pageName, {
    locale: params.locale,
    preview,
  })

  return {
    props: {
      ...data,
      ...data[pageName],
      locale: params.locale,
      preview,
    },
  }
}

export const staticPaths = async () => ({
  paths: [{ params: { locale: 'es' } }, { params: { locale: 'en' } }],
  fallback: false,
})
