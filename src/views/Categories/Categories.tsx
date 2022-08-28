import cx from 'classnames';
import { NextPage } from 'next';
import { FC, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ChevronDown from '../../assets/icons/chevronDown.svg';
import Plus from '../../assets/icons/plusCircle.svg';
import Fab from '../../components/Fab/Fab';
import { toCents, toDisplay } from '../../utils/formatCurrency';
import styles from './Categories.module.scss';

interface CategoryProps {
  id: string;
  index: number;
  groupId: string;
}

const Category: FC<CategoryProps> = ({ id, index }) => {
  const [allocatedInput, setAllocatedInput] = useState(0);

  function maskInput(input: string): void {
    setAllocatedInput(toCents(input));
  }

  return (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided) => (
        <div
          className={styles.category}
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
        >
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
      )}
    </Draggable>
  );
};

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

const Categories: NextPage = () => (
  <DragDropContext onDragEnd={() => null}>
    <Droppable droppableId="group" type="groups">
      {(provided) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div className={styles.groups} ref={provided.innerRef} {...provided.droppableProps}>
          {[
            { id: 'a', sort: 1 },
            { id: 'b', sort: 2 },
          ]
            .sort((a, b) => {
              if (a.sort > b.sort) return 1;
              if (a.sort < b.sort) return -1;
              return 0;
            })
            .map((group, i) => (
              <Group budgetId="foo" id={group.id} index={i} key={group.id} />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    <Fab>+</Fab>
  </DragDropContext>
);

export default Categories;
