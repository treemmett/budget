import React, { useEffect, useRef, useState } from 'react';
import Chevron from './icons/Chevron';
import cx from 'classnames';
import inputStyles from './TextField.module.scss';
import randomString from '../utils/randomString';
import styles from './SelectField.module.scss';

type Option = string | { value: string; label?: string };

interface SelectFieldProps {
  id?: string;
  label?: string;
  name?: string;
  required?: boolean;
  options: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  name,
  options,
  required
}: SelectFieldProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [focus, setFocus] = useState(false);
  const [renderedValueName, setValueName] = useState('');
  const [renderedLabel, setLabel] = useState('');
  const [focusedValue, setFocusedValue] = useState(-1);
  const [renderedId, setId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setId(id || `select-${randomString()}`);
  }, [id]);

  function onFocus(): void {
    setShowDropdown(true);
  }

  function onBlur(): void {
    setShowDropdown(false);
  }

  function focusValue(option: number | 'next' | 'prev'): void {
    switch (option) {
      case 'next': {
        const nextIndex = focusedValue + 1;

        if (nextIndex >= options.length) {
          setFocusedValue(options.length - 1);
        } else {
          setFocusedValue(nextIndex);
        }
        break;
      }

      case 'prev': {
        const prevIndex = focusedValue - 1;
        setFocusedValue(prevIndex < 0 ? 0 : prevIndex);
        break;
      }

      default:
        setFocusedValue(option);
    }
  }

  function selectOption(): void {
    const value = options[focusedValue];
    setValueName(typeof value === 'string' ? value : value.value);
    setLabel(typeof value === 'string' ? value : value.label || value.value);
    setFocus(!!value);
    setShowDropdown(false);
    const input = inputRef.current as HTMLInputElement;
    input.blur();
  }

  function onKeyDown(e: React.KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        focusValue('next');
        return;

      case 'ArrowUp':
      case 'ArrowLeft':
        focusValue('prev');
        return;

      case 'Enter':
        selectOption();
        return;

      case 'Escape': {
        setShowDropdown(false);
        const input = inputRef.current as HTMLInputElement;
        input.blur();
        break;
      }

      default:
        e.preventDefault();
        break;
    }
  }

  return (
    <label
      className={cx(inputStyles.field, styles.field, {
        [inputStyles.focus]: focus
      })}
      htmlFor={renderedId}
      onMouseDown={e => e.preventDefault()}
      onClick={e => {
        e.preventDefault();
        const input = inputRef.current as HTMLInputElement;
        if (showDropdown) {
          input.blur();
        } else {
          input.focus();
        }
      }}
    >
      <div className={cx(inputStyles.input, styles.display)}>
        {renderedLabel}
      </div>
      <div className={styles.indicator}>
        <Chevron />
      </div>
      <div className={inputStyles.label}>{label}</div>
      <input
        className={styles.input}
        id={renderedId}
        name={name}
        onBlur={onBlur}
        onChange={selectOption}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        ref={inputRef}
        required={required}
        value={renderedValueName}
      />
      {showDropdown && (
        <div
          className={styles.dropdown}
          onKeyDown={onKeyDown}
          onMouseDown={e => e.preventDefault()}
          onClick={e => e.preventDefault()}
          tabIndex={-1}
          role="listbox"
        >
          {options.map((v, i) => {
            const l = typeof v === 'string' ? v : v.label || v.value;
            const value = typeof v === 'string' ? v : v.value;
            const key = `${l}-${value}-${i}`;

            return (
              <div
                tabIndex={-1}
                className={cx(styles.option, {
                  [styles.focus]: focusedValue === i,
                  [styles.selected]:
                    value === renderedValueName && l === renderedLabel
                })}
                key={key}
                onKeyDown={onKeyDown}
                onClick={selectOption}
                onMouseOver={() => focusValue(i)}
                onFocus={() => focusValue(i)}
                role="button"
              >
                {l}
              </div>
            );
          })}
        </div>
      )}
      <div className={inputStyles.border} />
    </label>
  );
};

export default SelectField;
