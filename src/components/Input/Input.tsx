import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './Input.scss';

export interface InputProps {
  /** Class name concatenated to input wrapper */
  className?: string;
  /** ID of the input */
  id?: string;
  /** Label for the input */
  label?: string;
  /** Name to pass to the input */
  name?: string;
  /** On change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** If the input is readonly and can't be changed by the user */
  readOnly?: boolean;
  /** If the input is required */
  required?: boolean;
  /** Input type */
  type?: string;
  /** Value for controlled input */
  value?: string;
}

const Input: FC<InputProps> = ({
  className,
  id,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  readOnly,
  required,
  type,
  value
}) => {
  const [labelActive, setLabelActive] = useState(false);
  const [realId, setId] = useState('');

  useEffect(() => {
    setId(
      id ||
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
    );
  }, [id]);

  function blurHandler(e: React.FocusEvent<HTMLInputElement>): void {
    setLabelActive(!!e.currentTarget.value);

    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  }

  function focusHandler(e: React.FocusEvent<HTMLInputElement>): void {
    setLabelActive(true);

    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  }

  return (
    <>
      <label
        htmlFor={realId}
        className={cx(className, styles.input, { [styles.hasLabel]: label })}
      >
        {label && (
          <label
            htmlFor={realId}
            className={cx(styles.label, { [styles.inactive]: !labelActive })}
          >
            {label}
          </label>
        )}
        <input
          id={realId}
          name={name}
          onBlur={blurHandler}
          onChange={onChange}
          onFocus={focusHandler}
          readOnly={readOnly}
          required={required}
          type={type}
          value={value}
        />
      </label>
    </>
  );
};

export default Input;
