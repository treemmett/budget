import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './TextField.module.scss';

interface DateFieldProps {
  autoFocus?: boolean;
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  required?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
  autoFocus,
  className,
  id,
  label,
  name,
  required
}: DateFieldProps) => {
  const [realId, setId] = useState(id);
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [showCalendar, setShowCalendar] = useState(autoFocus);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

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

  function changeMonth(direction: 1 | -1): void {
    const tempDate = new Date(year, month, 1);
    tempDate.setMonth(tempDate.getMonth() + direction);
    setYear(tempDate.getFullYear());
    setMonth(tempDate.getMonth());
  }

  function setDate(e: React.SyntheticEvent, day: number): void {
    e.stopPropagation();

    const d = new Date(year, month, day);
    const s = d.toISOString().substring(0, 10);
    setValue(s);
    setShowCalendar(false);
    setFocus(!!s);
  }

  const monthStrings = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const renderedDate = new Date();
  const [renderedYear, renderedMonth, renderedDay] = value
    .split('-')
    .map(a => parseInt(a, 10));
  renderedDate.setFullYear(renderedYear);
  renderedDate.setMonth(renderedMonth - 1);
  renderedDate.setDate(renderedDay);

  const today = new Date();

  return (
    <label
      className={cx(className, styles['calendar-field'], styles.field, {
        [styles.focus]: focus,
        [styles.active]: showCalendar
      })}
      htmlFor={realId}
      onClick={() => setShowCalendar(true)}
    >
      <div className={styles.input}>
        {value && renderedDate.toLocaleDateString()}
      </div>
      <div className={styles.label}>{label}</div>
      <input
        type="date"
        name={name}
        id={id}
        value={value}
        onFocus={() => setShowCalendar(true)}
        onChange={e =>
          setDate(e, new Date((e.target as HTMLInputElement).value).getDate())
        }
        required={required}
      />
      {showCalendar && (
        <div className={styles.calendar}>
          <div className={styles.selector}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => changeMonth(-1)}
            >
              &lt;
            </button>
            <div className={styles.text}>
              {monthStrings[month]} {year}
            </div>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => changeMonth(1)}
            >
              &gt;
            </button>
          </div>
          <div className={styles.grid}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={styles.weekday} key={d + i}>
                {d}
              </div>
            ))}
            {Array(new Date(year, month + 1, 0).getDate())
              .fill(null)
              .map((v, i) => {
                const key = year + month + i;

                return (
                  <button
                    className={cx(styles.day, {
                      [styles.selected]:
                        renderedDay === i + 1 &&
                        renderedMonth === month + 1 &&
                        renderedYear === year,
                      [styles.today]:
                        today.getDate() === i + 1 &&
                        today.getMonth() === month &&
                        today.getFullYear() === year
                    })}
                    style={{
                      gridColumnStart:
                        i === 0
                          ? new Date(year, month, 1).getDay() + 1
                          : undefined
                    }}
                    key={key}
                    onClick={e => setDate(e, i + 1)}
                    type="button"
                  >
                    {i + 1}
                  </button>
                );
              })}
          </div>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              setShowCalendar(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </label>
  );
};

export default DateField;
