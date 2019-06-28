import React, { useState, useEffect } from 'react';
import PT from 'prop-types';
import cx from 'classnames';
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

const TextField: React.FC<{
  defaultValue?: string;
  id?: string;
  label?: string;
  name?: string;
  type?: Type;
  value?: string;
}> = ({ defaultValue, id, label, name, type = 'text', value }) => {
  const [realId, setId] = useState(id);
  const [focus, setFocus] = useState(!!(value || defaultValue));

  useEffect(() => {
    if (!id) {
      setId(btoa(Date.now().toString()));
    }
  }, [id]);

  useEffect(() => {
    setFocus(!!(value || defaultValue));
  }, [value, defaultValue]);

  function onFocus(): void {
    setFocus(true);
  }

  function onBlur(e: React.SyntheticEvent): void {
    const input = e.target as HTMLInputElement;

    if (!input.value.trim()) {
      setFocus(false);
    }
  }

  return (
    <label
      className={cx(styles.input, { [styles.focus]: focus })}
      htmlFor={realId}
    >
      <input
        defaultValue={defaultValue}
        id={realId}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        type={type}
      />
      <div className={styles.label}>{label}</div>
    </label>
  );
};

TextField.propTypes = {
  defaultValue: PT.string,
  id: PT.string,
  label: PT.string,
  name: PT.string,
  type: PT.oneOf([
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week'
  ]),
  value: PT.string
};

TextField.defaultProps = {
  type: 'text'
};

export default TextField;
