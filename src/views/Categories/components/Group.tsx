import React, { FC, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import ChevronDown from '../../../assets/icons/chevronDown.svg';
import cx from 'classnames';
import styles from '../Categories.scss';

interface Category {
  id: string;
  name: string;
}

interface GroupProps {
  group: {
    id: string;
    name: string;
    categories: Category[];
  };
}

const Group: FC<GroupProps> = ({ group }) => {
  const [collapsed, setCollapsed] = useState(false);
  const transition = useTransition(!collapsed, null, {
    config: { clamp: true, friction: 51, mass: 1, tension: 268 },
    enter: { height: `${group.categories.length * 3.25}rem` },
    from: { height: '0rem' },
    leave: { height: '0rem' },
  });

  return (
    <div
      className={cx(styles.group, { [styles.collapsed]: collapsed })}
      key={group.id}
    >
      <div className={styles.header}>
        <div className={styles.title}>{group.name}</div>
        <button
          aria-label={`Collapse group ${group.name}`}
          className={styles.toggle}
          onClick={() => setCollapsed(s => !s)}
          type="button"
        >
          <ChevronDown />
        </button>
      </div>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className={styles.categories} key={key} style={props}>
              {group.categories.map(category => (
                <div className={styles.category} key={category.id}>
                  {category.name}
                </div>
              ))}
            </animated.div>
          )
      )}
    </div>
  );
};

export default Group;
