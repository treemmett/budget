import React, { useEffect, useState } from 'react';
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
  className?: string;
  defaultValue?: string;
  id?: string;
  label?: string;
  name?: string;
  type?: Type;
  value?: string;
}> = ({ className, defaultValue, id, label, name, type = 'text', value }) => {
  const [realId, setId] = useState(id);
  const [focus, setFocus] = useState(!!(value || defaultValue));

  useEffect(() => {
    if (!id) {
      setId(
        `input-${btoa((Date.now() * Math.random()).toString()).replace(
          /=/g,
          ''
        )}`
      );
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
      className={cx(className, styles.field, { [styles.focus]: focus })}
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
        className={styles.input}
      />
      <div className={styles.label}>{label}</div>
      <div className={styles.border} />
    </label>
  );
};

TextField.propTypes = {
  className: PT.string,
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
