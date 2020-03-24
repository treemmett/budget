import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Button.scss';

interface ButtonProps {
  color?: 'blue' | 'green' | 'orange' | 'red';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  priority?: 'primary' | 'secondary';
}

const Button: FC<ButtonProps> = ({ children, color, onClick }) => (
  <button
    type="button"
    className={cx(styles.button, {
      [styles.blue]: color === 'blue',
      [styles.green]: color === 'green',
      [styles.orange]: color === 'orange',
      [styles.red]: color === 'red'
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
