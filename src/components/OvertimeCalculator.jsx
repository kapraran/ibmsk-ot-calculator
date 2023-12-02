/* eslint-disable react/prop-types */
import { useDroppable } from '@dnd-kit/core';

export function OvertimeCalculator({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };


  return (
    <div className='ot-calculation-list' ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default OvertimeCalculator
