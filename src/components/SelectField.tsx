import React, { useMemo, useRef, useState } from 'react';
import Chevron from './icons/Chevron';
import cx from 'classnames';
import inputStyles from './TextField.module.scss';
import randomString from '../utils/randomString';
import styles from './SelectField.module.scss';

interface Option {
  value: string;
  label?: string;
  group?: string;
}
interface Group {
  id: string;
  label: string;
}

interface SelectFieldProps {
  groups?: Group[];
  id?: string;
  label?: string;
  name?: string;
  options: Option[];
  required?: boolean;
}

interface OptionItem {
  group: false;
  groupMember: boolean;
  id: string;
  index: number;
  label: string;
  value: string;
}

interface GroupItem {
  group: true;
  id: string;
  label: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  groups,
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
  const [search, setSearch] = useState('');
  const [focusedValue, setFocusedValue] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const fakeId = useRef<string>(`select=${randomString()}`);

  const items = useMemo(() => {
    let totalOptions = -1;

    const regex = new RegExp(search, 'i');

    const filteredGroups =
      search && groups
        ? groups.filter(g => {
            if (regex.test(g.label)) {
              return true;
            }

            const groupOptions = options.filter(
              o => o.group && o.group === g.id
            );

            return groupOptions.some(o => regex.test(o.label || o.value));
          })
        : groups;

    const filteredOptions = search
      ? options.filter(o => {
          // check if option matches result
          if (regex.test(o.label || o.value)) {
            // option matches, check if we need
            return true;
          }

          // check if option is part of a matched group
          if (o.group && groups) {
            const group = groups.find(g => g.id === o.group);

            return group && regex.test(group.label);
          }

          return false;
        })
      : options;

    const returnValue: (GroupItem | OptionItem)[] = [];

    // add items that don't have a group first
    returnValue.push(
      ...filteredOptions
        .filter(o => !o.group)
        .map(o => {
          totalOptions += 1;

          return {
            group: false,
            groupMember: false,
            id: `${totalOptions}-${o.value}-${o.label || o.value}`,
            label: o.label || o.value,
            value: o.value,
            index: totalOptions
          };
        })
    );

    if (!filteredGroups) {
      return returnValue;
    }

    filteredGroups.forEach(g => {
      returnValue.push({
        group: true,
        id: g.id,
        label: g.label
      });

      returnValue.push(
        ...filteredOptions
          .filter(o => o.group && o.group === g.id)
          .map(o => {
            totalOptions += 1;

            return {
              group: false,
              groupMember: true,
              id: `${totalOptions}-${o.value}-${o.label || o.value}`,
              label: o.label || o.value,
              value: o.value,
              index: totalOptions
            };
          })
      );
    });

    return returnValue;
  }, [groups, options, search]);

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
    const value = items.find(
      item => !item.group && item.index === focusedValue
    ) as OptionItem;

    setValueName(value.value);
    setLabel(value.label || value.value);
    setFocus(!!value);
    setSearch('');
    setShowDropdown(false);
    const input = inputRef.current as HTMLInputElement;
    input.blur();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    switch (e.key) {
      case 'ArrowDown':
        focusValue('next');
        break;

      case 'ArrowUp':
        focusValue('prev');
        break;

      case 'Enter':
        selectOption();
        break;

      case 'Escape': {
        setShowDropdown(false);
        const input = inputRef.current as HTMLInputElement;
        input.blur();
        break;
      }

      default:
        break;
    }
  }

  function handleSearch(e: React.SyntheticEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  return (
    <label
      className={cx(inputStyles.field, styles.field, {
        [inputStyles.focus]: focus
      })}
      htmlFor={fakeId.current}
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
      <input
        className={inputStyles.input}
        id={fakeId.current}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={handleSearch}
        value={showDropdown ? search : renderedLabel}
        ref={inputRef}
      />
      <div className={styles.indicator}>
        <Chevron />
      </div>
      <div className={inputStyles.label}>{label}</div>
      <input
        className={styles.input}
        id={id}
        name={name}
        required={required}
        onChange={selectOption}
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
          {items.map(item => {
            return item.group ? (
              <div className={styles.group} key={item.id}>
                {item.label}
              </div>
            ) : (
              <div
                className={cx(styles.option, {
                  [styles['group-option']]: item.groupMember,
                  [styles.focus]: focusedValue === item.index,
                  [styles.selected]:
                    item.value === renderedValueName &&
                    item.label === renderedLabel
                })}
                onKeyDown={onKeyDown}
                onClick={selectOption}
                onMouseOver={() => focusValue(item.index)}
                onFocus={() => focusValue(item.index)}
                role="button"
                tabIndex={-1}
                key={item.id}
              >
                {item.label}
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
