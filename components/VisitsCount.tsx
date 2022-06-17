import { Button } from './Button'
import { _ } from 'locales'
import { useRouter } from 'next/router'

export const VisitsCount = (props: { count: number }) => {
  const { locale } = useRouter()

  return (
    <Button
      title={_('Visits', locale)}
      size="sm"
      icon="chart"
      className="button-like"
      disabled
    >
      {props.count}
    </Button>
  )
}
