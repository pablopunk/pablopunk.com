"use client";

import { useEffect, useState } from "react";

type Props = { date: Date };

export const DateLocale = ({ date }: Props) => {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    setDateString(date.toLocaleDateString());
  }, [date]);

  return <>{dateString}</>;
};
