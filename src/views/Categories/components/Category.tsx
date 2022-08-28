import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { toCents, toDisplay } from '../../../utils/formatCurrency';
import styles from '../Categories.module.scss';

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

export default Category;
