import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import styles from './Btn.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

const Btn: React.FC<{
  className?: string;
  label?: string;
  name?: string;
  type?: ButtonType;
}> = ({ className, label, name, type = 'button' }) => (
  <button type={type} name={name} className={cx(styles.button, className)}>
    {label}
  </button>
);

Btn.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Btn;
