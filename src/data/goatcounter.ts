type WindowWithGoatcounter = Window & {
  goatcounter?: {
    count: (options: { path: string }) => void;
  };
};

export const countVisit = (url: string) => {
  (window as WindowWithGoatcounter).goatcounter?.count({
    path: url,
  });
};
