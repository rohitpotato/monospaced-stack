"use client";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./color-picker.module.css";
import { recordEvent } from "@/app/_utils/record-event";
import useDebounce from "@/app/_hooks/use-debounce";

const ColorPicker: React.FC = () => {
  const { baseColor, setBaseColor } = useTheme();
  const debouncedRecordEvent = useDebounce(recordEvent, 1000);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-picker" className="sr-only">
        Theme Color
      </label>
      <input
        id="theme-picker"
        type="color"
        value={baseColor}
        onChange={(e) => {
          setBaseColor(e.target.value);
          debouncedRecordEvent("theme-color-change", {
            color: e.target.value,
          });
        }}
        className={styles.colorInput}
        title="Change theme color"
      />
    </div>
  );
};

export default ColorPicker;
