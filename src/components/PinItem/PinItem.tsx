import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TPin } from "../../types/pins";
import removeIcon from "../../assets/icons/remove.svg";
import dragIndicator from "../../assets/icons/dragIndicator.svg";

type TProps = {
  name: TPin["name"];
  pinKey: TPin["id"];
  address: TPin['address'];
  deletePin: (pinKey: string) => void;
};

const PinItem = ({ name, pinKey, address, deletePin }: TProps): JSX.Element => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pinKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div className="pin-item" style={style} data-cy="pin-item">
      <div className="pin-item__texts">
        <p className="pin-item__text">{name}</p>
        <p className="pin-item__text">{address}</p>
      </div>
      <div className="pin-item__buttons">
        <button
          type="button"
          aria-label="Delete"
          className="pin-item__delete"
          onClick={() => deletePin(pinKey)}
          data-cy="pin-item-delete-button"
        >
          <img src={removeIcon} alt="delete icon" />
        </button>
        <button
          type="button"
          aria-label="Drag"
          className="pin-item__drag"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          data-cy="pin-item-drag-button"
        >
          <img src={dragIndicator} alt="drag icon" />
        </button>
      </div>
    </div>
  );
};

export default PinItem;
