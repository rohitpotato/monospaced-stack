"use client";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ColorPicker: React.FC = () => {
  const { baseColor, setBaseColor } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-picker" className="sr-only">
        Theme Color
      </label>
      <input
        id="theme-picker"
        type="color"
        value={baseColor}
        onChange={(e) => setBaseColor(e.target.value)}
        className="w-8 h-8 p-0.5 bg-transparent border-2 rounded-md cursor-pointer appearance-none"
        title="Change theme color"
        style={{
          color: "var(--color-text-secondary)",
          borderColor: "currentColor",
        }}
      />
      <style>{`
                input[type="color"]::-webkit-color-swatch-wrapper {
                    padding: 0;
                }
                input[type="color"]::-webkit-color-swatch {
                    border: none;
                    border-radius: 4px;
                }
                input[type="color"]::-moz-color-swatch {
                    border: none;
                    border-radius: 4px;
                }
            `}</style>
    </div>
  );
};

export default ColorPicker;
