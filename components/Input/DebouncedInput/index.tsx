import React, { useEffect, useState } from "react";

interface DevounceInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  styles?: string
}
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  styles,
  ...props
}: DevounceInputProps ) =>{
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      className={`bg-black-60 px-4 py-2 rounded-lg text-base font-normal ${styles}`}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

  export default DebouncedInput