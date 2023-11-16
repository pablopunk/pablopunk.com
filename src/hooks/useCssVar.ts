import { useEffect, useState } from "react";
import { useTheme } from "~/hooks/useTheme";

export const useCssVar = (cssVar: string) => {
  const [theme] = useTheme();
  const [value, setValue] = useState("");

  useEffect(() => {
    const valueOfVar = getComputedStyle(document.body).getPropertyValue(cssVar);

    setValue(valueOfVar.trim());
  }, [cssVar, theme]);

  return value;
};
