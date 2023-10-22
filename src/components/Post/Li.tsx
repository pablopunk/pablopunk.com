export const Li = ({ children }: React.PropsWithChildren) => {
  return <li className="pl-2">
    <span className="text-indigo-600 dark:text-indigo-400">{'->'}</span>{' '}{children}
  </li>
}