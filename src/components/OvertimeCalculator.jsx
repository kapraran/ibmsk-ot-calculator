/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";
import { presets } from "../presets";
import { toRGB } from "../utils";

export function OvertimeCalculator({
  items,
  setOtItems,
  hourlyRate,
  minimumHourlyRate,
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  const removeItem = (item) => {
    const index = items.findIndex((it) => it.id === item.id);
    items.splice(index, 1);
    setOtItems([...items]);
  };

  const updateItem = (item, hours) => {
    item.hours = hours;
    setOtItems([...items]);
  };

  const extraMoney = (item) =>
    presets
      .find((p) => p.name === item.type)
      .calculate({ hours: item.hours, hourlyRate, minimumHourlyRate })
      .toFixed(2);

  return (
    <div className="ot-calculation-list" ref={setNodeRef} style={style}>
      {items.length === 0 && (
        <div className="ot-calculation-list-drop-message">
          DRAG & DROP OVERTIME ITEMS HERE 😉
        </div>
      )}
      {items.map((item) => (
        <div className="ot-item" key={item.id}>
          <div className="ot-item-title">
            <button onClick={() => removeItem(item)}>X</button>
            <span style={{ backgroundColor: toRGB(item.type, 0.32) }}>
              {item.type}
            </span>
          </div>
          <div className="ot-item-content">
            <div className="ot-item-input-wrapper">
              <input
                type="number"
                value={item.hours}
                onChange={(ev) => updateItem(item, parseInt(ev.target.value))}
                step={1}
                min={0}
                max={99}
              />
              <label>hours</label>
            </div>
            <div className="ot-item-extra-money">+{extraMoney(item)}€</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OvertimeCalculator;
