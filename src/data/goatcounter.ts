export const countVisit = (url: string) => {
  // @ts-ignore
  window.goatcounter.count({
    path: url,
  });
};
