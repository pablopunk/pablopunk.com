import React from 'react'
import { GetServerSideProps } from 'next'
import { fetchData } from '../../lib/api'

export const staticProps = async (pageName, { params, preview = false }) => {
  const data = await fetchData(pageName, {
    locale: params.locale,
    preview,
  })

  return {
    props: {
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
