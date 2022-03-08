import classNames from 'classnames'
import { FunctionComponent } from 'react'

type Props = {
  className?: string
}

export const BorderGradient: FunctionComponent<Props> = ({
  children,
  className,
}) => (
  <div
    className={classNames(
      'p-1 rounded-xl bg-gradient-to-r from-accent to-accent-alt hover:to-accent',
      className,
    )}
  >
    <div className="bg-bg rounded-lg">{children}</div>
  </div>
)