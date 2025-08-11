import React, { useRef } from "react";
import styles from "./OtpInput.module.scss";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlurValidate?: (isValid: boolean) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  value,
  onChange,
  error,
  onBlurValidate,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/, "");
    const newValue = value.split("");
    newValue[idx] = val;
    onChange(newValue.join(""));

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleBlur = (idx: number) => {
    if (idx === length - 1 && onBlurValidate) {
      onBlurValidate(value.length === length && !value.includes(""));
    }
  };

  return (
    <div className={styles.otpWrapper}>
      <div className={styles.inputsRow}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={value[i] || ""}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onBlur={() => handleBlur(i)}
            className={`${styles.otpInput} ${error ? styles.errorInput : ""}`}
          />
        ))}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
