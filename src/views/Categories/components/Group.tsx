import cx from 'classnames';
import React, { FC, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import ChevronDown from '../../../assets/icons/chevronDown.svg';
import Plus from '../../../assets/icons/plusCircle.svg';
import { toDisplay } from '../../../utils/formatCurrency';
import styles from '../Categories.module.scss';
import Category from './Category';

interface GroupProps {
  budgetId: string;
  id: string;
  index: number;
}

const Group: FC<GroupProps> = ({ id, index }) => {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isChangingTitle, setIsChangingTitle] = useState(false);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={cx(styles.group, { [styles.collapsed]: collapsed })}
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <div className={styles.header} {...provided.dragHandleProps}>
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
          <Droppable droppableId={id} key={id} type="categories">
            {(categoriesProvided) => (
              <AnimateHeight duration={300} easing="ease-in-out" height={collapsed ? 0 : 'auto'}>
                <div
                  className={styles.categories}
                  ref={categoriesProvided.innerRef}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...categoriesProvided.droppableProps}
                >
                  {[
                    { id: 'a', sort: 1 },
                    { id: 'b', sort: 2 },
                  ]
                    .sort((a, b) => {
                      if (a.sort > b.sort) return 1;
                      if (a.sort < b.sort) return -1;
                      return 0;
                    })
                    .map((category, i) => (
                      <Category groupId={id} id={category.id} index={i} key={category.id} />
                    ))}
                  {categoriesProvided.placeholder}
                </div>
              </AnimateHeight>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Group;
