import { Button } from './Button'
import { useTranslation } from 'hooks/useTranslation'

export const VisitsCount = (props: { count: number }) => {
  const { _ } = useTranslation()

  return (
    <Button
      title={_('Visits')}
      size="sm"
      icon="chart"
      className="button-like"
      disabled
    >
      {props.count}
    </Button>
  )
}
