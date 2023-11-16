"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return [
    theme,
    () => {
      document.body.classList.remove("light", "dark");
      const newTheme = theme === "light" ? "dark" : "light";
      document.body.classList.add(newTheme);
      setTheme(newTheme);
      toast.success(`Switched to ${newTheme} mode`);
    },
  ] as const;
}
