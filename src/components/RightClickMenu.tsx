"use client";

import { CSSProperties, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "~/hooks/useTheme";

export const RightClickMenu = () => {
  const [theme, toggleTheme] = useTheme();
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    position: "absolute",
    display: "none",
  });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setMenuStyle({
        position: "absolute",
        display: "block",
        left: `${e.pageX}px`,
        top: `${e.pageY}px`,
      });
    };

    const handleClick = () => {
      setMenuStyle({ ...menuStyle, display: "none" });
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      style={menuStyle}
      className="bg-neutral-1 text-neutral-9 min-w-[200px] border-2 border-neutral-2 rounded-md"
    >
      <ul>
        {[
          {
            text: theme === "dark" ? "Light mode" : "Dark mode",
            icon: theme === "dark" ? "☀️" : "🌙",
            onClick: toggleTheme,
          },
          {
            text: "Source code",
            icon: "💻",
            href: "https://github.com/pablopunk/pablopunk.com",
          },
          {
            text: "Copy text",
            icon: "📋",
            onClick: () => {
              navigator.clipboard.writeText(
                window.getSelection()?.toString() || "",
              );
              toast.success("Copied!");
            },
          },
        ].map(({ text, href, onClick, icon }) => (
          <li key={text}>
            <a
              href={href}
              onClick={onClick}
              className="flex gap-2 cursor-pointer hover:bg-neutral-2 py-2 px-3 hover:no-underline transition"
            >
              {icon && <span>{icon}</span>}
              <span>{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
