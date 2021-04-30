import { fetchData } from '@/datocms/'

export const staticProps = async (
  pageName: string,
  { preview = false, locale }
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
