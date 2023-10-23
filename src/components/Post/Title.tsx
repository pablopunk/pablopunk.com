export const H1 = ({ children }: React.PropsWithChildren) => (
  <h1 className="text-center font-bold font-serif text-2xl">{children}</h1>
);
export const H2 = ({ children }: React.PropsWithChildren) => (
  <h2 className="font-bold font-serif text-xl border-b border-neutral-3 pb-2">
    {children}
  </h2>
);
export const H3 = ({ children }: React.PropsWithChildren) => (
  <h3 className="font-bold font-serif text-lg">{children}</h3>
);
export const H4 = ({ children }: React.PropsWithChildren) => (
  <h4 className="font-bold font-serif text-base">{children}</h4>
);
export const H5 = ({ children }: React.PropsWithChildren) => (
  <h5 className="font-bold font-serif text-sm">{children}</h5>
);
export const H6 = ({ children }: React.PropsWithChildren) => (
  <h6 className="font-bold font-serif text-xs">{children}</h6>
);
