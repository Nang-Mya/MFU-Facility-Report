import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 md:h-5 md:w-5" />
      ) : (
        <Sun className="h-4 w-4 md:h-5 md:w-5" />
      )}
    </button>
  );
}
