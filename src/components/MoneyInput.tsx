import React, { SyntheticEvent, useEffect, useState } from 'react';
import formatCurrency from '../utils/formatCurrency';

const MoneyInput: React.FC<
  {
    value?: string;
    onChange?: (...args: any) => void;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  value,
  onChange,
  ...props
}: {
  value?: string;
  onChange?: (...args: any) => void;
}) => {
  const [realValue, setValue] = useState(formatCurrency(value || 0));

  useEffect(() => {
    if (value) {
      setValue(formatCurrency(value));
    }
  }, [value]);

  function format(e: SyntheticEvent): void {
    const input = (e.currentTarget as HTMLInputElement).value;
    setValue(formatCurrency(input));

    if (onChange) {
      onChange(e);
    }
  }

  return <input {...props} value={realValue} onChange={format} />;
};

export default MoneyInput;
