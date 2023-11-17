export const Li = ({ children }: React.PropsWithChildren) => {
  return (
    <li className="pl-2">
      <span className="text-accent-7">{"->"}</span> {children}
    </li>
  );
};
