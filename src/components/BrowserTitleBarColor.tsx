"use client";

import { useCssVar } from "~/hooks/useCssVar";

export const BrowserTitleBarColor = () => {
  const titleBarColor = useCssVar("--color-neutral-0");
  return <meta name="theme-color" content={titleBarColor} />;
};
