import React from 'react'
import { fetchData } from 'lib/api'

export const staticProps = async (
  pageName: string,
  { params, preview = false, locale }
) => {
  const data = await fetchData(pageName, {
    locale,
    preview,
  })

  return {
    props: {
      ...data,
      ...data[pageName],
      locale,
      preview,
    },
  }
}
