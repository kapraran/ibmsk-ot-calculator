import { useDraggable } from "@dnd-kit/core";
import { toRGB } from "../utils";

// eslint-disable-next-line react/prop-types
export function OvertimePreset({ name, description }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: name,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="ot-preset"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="name">
        <span
          className="circle"
          style={{ backgroundColor: toRGB(name) }}
        ></span>
        <span>{name}</span>
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

export default OvertimePreset;
