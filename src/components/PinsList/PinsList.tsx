import React, { Dispatch, SetStateAction } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PinItem from "../PinItem/PinItem";
import type { TPin } from "../../types/pins";

type TProps = {
  pins: TPin[];
  deletePin: (key: string) => void;
  setPins: Dispatch<SetStateAction<TPin[]>>;
};

const PinsList = ({ pins, deletePin, setPins }: TProps): JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPins((items) => {
        const oldIndex = items.findIndex((pin) => pin.id === active.id);
        const newIndex = items.findIndex((pin) => pin.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="pin-list" data-cy="pin-list">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // eslint-disable-next-line react/jsx-no-bind
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pins} strategy={verticalListSortingStrategy}>
          {pins.map(({ name, id }) => (
            <PinItem key={id} name={name} pinKey={id} deletePin={deletePin} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default PinsList;
