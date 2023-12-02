/* eslint-disable react/prop-types */
import { useDroppable } from '@dnd-kit/core';

export function OvertimeCalculator({ items, setOtItems }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  const removeItem = (item) => {
    const index = items.findIndex(it => it.id === item.id)
    items.splice(index, 1)
    setOtItems([...items])
  }

  const updateItem = (item, hours) => {
    item.hours = hours
    setOtItems([...items])
  }

  return (
    <div className='ot-calculation-list' ref={setNodeRef} style={style}>
      {items.map(item => <div key={item.id}>
        <div><button onClick={() => removeItem(item)}>X</button> {item.type}</div>
        <div>
          <input type="number" value={item.hours} onChange={(ev) => updateItem(item, parseInt(ev.target.value))} step={1} min={0} />
        </div>
      </div>)}
    </div>
  );
}

export default OvertimeCalculator
