export const Quote = ({ children }: React.PropsWithChildren) => {
  return <blockquote className="border-l-4 bg-neutral-2 rounded-r p-3 border-indigo-600 dark:border-indigo-400 italic">{children}</blockquote>;
}