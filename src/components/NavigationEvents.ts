"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as goatcounter from "~/data/goatcounter";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    goatcounter.countVisit(url);
  }, [pathname, searchParams]);

  return null;
}
