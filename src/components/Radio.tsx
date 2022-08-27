import React, { useMemo } from 'react';
import cx from 'classnames';
import inputStyles from './TextField.module.scss';
import randomString from '../utils/randomString';
import styles from './Radio.module.scss';

interface RadioProps {
  className?: string;
  defaultChecked?: boolean;
  id?: string;
  label?: string;
  name: string;
  value: string;
}

const Radio: React.FC<RadioProps> = ({
  className,
  defaultChecked,
  id,
  label,
  name,
  value
}: RadioProps) => {
  const realId = useMemo(() => id || `radio-${randomString()}`, [id]);

  return (
    <label
      className={cx(className, inputStyles.field, styles.field)}
      htmlFor={realId}
    >
      <input
        className={styles.input}
        defaultChecked={defaultChecked}
        id={realId}
        name={name}
        type="radio"
        value={value}
      />
      <div className={styles.radio}>{label}</div>
      <div className={cx(inputStyles.border, styles.border)}>{label}</div>
    </label>
  );
};

export default Radio;
