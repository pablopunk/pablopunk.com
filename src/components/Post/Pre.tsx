export const Pre = ({ children }: React.PropsWithChildren) => {
  return (
    <pre className="text-sm bg-neutral-2 p-3 rounded-md">
      {children}
    </pre>
  );
}