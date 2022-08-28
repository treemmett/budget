import cx from 'classnames';
import { NextPage } from 'next';
import { FC, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import ChevronDown from '../assets/icons/chevronDown.svg';
import Plus from '../assets/icons/plusCircle.svg';
import Fab from '../components/Fab/Fab';
import { toCents, toDisplay } from '../utils/formatCurrency';
import styles from './categories.module.scss';

const Category: FC = () => {
  const [allocatedInput, setAllocatedInput] = useState(0);

  function maskInput(input: string): void {
    setAllocatedInput(toCents(input));
  }

  return (
    <div className={styles.category}>
      <div className={styles.title}>My Category</div>
      <div className={styles.field}>
        <input
          className={styles.input}
          onChange={(e) => maskInput(e.currentTarget.value)}
          placeholder="$0.00"
          value={allocatedInput > 0 ? toDisplay(allocatedInput) : ''}
        />
      </div>
    </div>
  );
};

const Group: FC = () => {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isChangingTitle, setIsChangingTitle] = useState(false);

  return (
    <div className={cx(styles.group, { [styles.collapsed]: collapsed })}>
      <div className={styles.header}>
        {isChangingTitle ? (
          <input
            aria-label="Group name"
            className={cx(styles.title, styles.edit)}
            defaultValue="My Group"
            onBlur={() => setIsChangingTitle(false)}
          />
        ) : (
          <div className={styles.title}>
            <span className={styles.text} onDoubleClick={() => setIsChangingTitle(true)}>
              My Group
            </span>
            <button
              className={styles.plus}
              onClick={() => setIsCreatingCategory(true)}
              type="button"
            >
              <Plus />
            </button>
            {isCreatingCategory && (
              <div className={styles.tooltip}>
                <input
                  onBlur={() => setIsCreatingCategory(false)}
                  placeholder="New category name"
                />
              </div>
            )}
          </div>
        )}
        <div className={styles.key}>Allocated</div>
        <div className={styles.field}>{toDisplay(343343)}</div>
        <div className={styles.border} />
        <button
          aria-label="Collapse group my group"
          className={styles.toggle}
          onClick={() => setCollapsed((s) => !s)}
          type="button"
        >
          <ChevronDown />
        </button>
      </div>

      <AnimateHeight duration={300} easing="ease-in-out" height={collapsed ? 0 : 'auto'}>
        <div className={styles.categories}>
          {[
            { id: 'a', sort: 1 },
            { id: 'b', sort: 2 },
          ]
            .sort((a, b) => {
              if (a.sort > b.sort) return 1;
              if (a.sort < b.sort) return -1;
              return 0;
            })
            .map((category) => (
              <Category key={category.id} />
            ))}
        </div>
      </AnimateHeight>
    </div>
  );
};

const Categories: NextPage = () => (
  <>
    <div className={cx(styles.groups, 'view')}>
      <Group />
      <Group />
      <Group />
    </div>
    <Fab>+</Fab>
  </>
);

export default Categories;
