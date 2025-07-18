"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./color-picker.module.css";

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
        className={styles.colorInput}
        title="Change theme color"
      />
    </div>
  );
};

export default ColorPicker;
