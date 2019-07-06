import React, { useEffect, useMemo, useState } from 'react';
import PT from 'prop-types';
import cx from 'classnames';
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
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  id?: string;
  label?: string;
  mask?: (input: string) => string | number;
  name?: string;
  required?: boolean;
  type?: Type;
  value?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  autoFocus,
  className,
  defaultValue,
  id,
  label,
  mask,
  name,
  required,
  type = 'text',
  value
}: TextFieldProps) => {
  const [focus, setFocus] = useState(
    mask ? !!mask(value || defaultValue || '') : !!(value || defaultValue)
  );
  const [renderedValue, setValue] = useState(value || '');
  const realId = useMemo(() => id || `input-${randomString()}`, [id]);

  useEffect(() => {
    const newFocus = mask
      ? !!mask(value || defaultValue || '')
      : !!(value || defaultValue);

    if (newFocus !== focus) {
      setFocus(newFocus);
    }
  }, [value, defaultValue, mask, focus]);

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
      className={cx(className, styles.field, { [styles.focus]: focus })}
      htmlFor={realId}
    >
      <input
        autoFocus={autoFocus}
        className={styles.input}
        defaultValue={defaultValue}
        id={realId}
        name={name}
        onChange={changeHandler}
        onBlur={onBlur}
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

export const SplitInputs: React.FC = ({ children }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
  <label className={styles.split}>
    {React.Children.map(children, child => {
      // @ts-ignore
      return React.cloneElement(child, {
        // @ts-ignore
        className: cx(child.props.className, styles['split-field'])
      });
    })}
  </label>
);

SplitInputs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PT.any
};
