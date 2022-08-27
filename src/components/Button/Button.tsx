import cx from 'classnames';
import React, { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends PropsWithChildren {
  color?: 'blue' | 'green' | 'orange' | 'red';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ children, color, onClick }) => (
  <button
    className={cx(styles.button, {
      [styles.blue]: color === 'blue',
      [styles.green]: color === 'green',
      [styles.orange]: color === 'orange',
      [styles.red]: color === 'red',
    })}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export default Button;
