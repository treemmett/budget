import cx from 'classnames';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import randomString from '../utils/randomString';
import styles from './TextField.module.scss';

type Type =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface TextFieldProps {
  className?: string;
  defaultValue?: string;
  id?: string;
  label?: string;
  mask?: (input: string) => string | number;
  name?: string;
  required?: boolean;
  split?: boolean;
  type?: Type;
  value?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  defaultValue,
  id,
  label,
  mask,
  name,
  required,
  split,
  type = 'text',
  value,
}: TextFieldProps) => {
  const [focus, setFocus] = useState(
    mask ? !!mask(value || defaultValue || '') : !!(value || defaultValue)
  );
  const [renderedValue, setValue] = useState(value || '');
  const realId = useMemo(() => id || `input-${randomString()}`, [id]);

  useEffect(() => {
    const newFocus = mask ? !!mask(value || defaultValue || '') : !!(value || defaultValue);

    setFocus(newFocus);
  }, [value, defaultValue, mask]);

  function changeHandler(e: React.SyntheticEvent<HTMLInputElement>): void {
    setValue(value || e.currentTarget.value);
  }

  function onFocus(): void {
    setFocus(true);
  }

  function onBlur(e: React.SyntheticEvent<HTMLInputElement>): void {
    const newFocus = !!e.currentTarget.value.trim();

    if (newFocus !== focus) {
      setFocus(newFocus);
    }
  }

  return (
    <label
      className={cx(className, styles.field, {
        [styles.focus]: focus,
        [styles['split-field']]: split,
      })}
      htmlFor={realId}
    >
      <input
        className={styles.input}
        defaultValue={defaultValue}
        id={realId}
        name={name}
        onBlur={onBlur}
        onChange={changeHandler}
        onFocus={onFocus}
        required={required}
        type={type}
        value={mask ? mask(renderedValue) : renderedValue}
      />
      <div className={styles.label}>{label}</div>
      <div className={styles.border} />
    </label>
  );
};

export default TextField;

export const SplitInputs: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.split}>{children}</div>
);
