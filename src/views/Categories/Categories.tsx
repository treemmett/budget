import { NextPage } from 'next';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Fab from '../../components/Fab/Fab';
import styles from './Categories.module.scss';
import Group from './components/Group';

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
