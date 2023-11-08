export const countVisit = (url: string) => {
  (window as any).goatcounter.count({
    path: url,
  });
};
