import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Loader.scss';

interface LoaderProps {
  /** Use secondary blue background color. If false, use primary orange. */
  secondary?: boolean;
  /** Size of loader. Defaults to 'small' */
  size?: 'small' | 'medium' | 'large';
}

const Loader: FC<LoaderProps> = ({ secondary, size }) => {
  return (
    <div
      className={cx(styles.loader, {
        [styles.large]: size === 'large',
        [styles.medium]: size === 'medium',
      })}
    >
      {new Array(3).fill(null).map((e, i) => (
        <div
          className={cx(styles.dot, { [styles.secondary]: secondary })}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))}
    </div>
  );
};

export default Loader;
