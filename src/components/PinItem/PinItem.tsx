import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import type { TPin } from '../../types/pins';
import removeIcon from '../../assets/icons/remove.svg';
import dragIcon from '../../assets/icons/drag.svg';

type TProps = {
  name: TPin['name'],
  pinKey: TPin['id'],
  deletePin: (pinKey: string) => void
};

const PinItem = ({ name, pinKey, deletePin }: TProps): JSX.Element => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: pinKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1
  };

  return (
    <div className='pin-item' style={style} >
      <p className="pin-item__text">{name}</p>
      <div className="pin-item__buttons">
        <button type='button' aria-label='Delete' className="pin-item__delete" onClick={() => deletePin(pinKey)} >
          <img src={removeIcon} alt="delete icon" />
        </button>
        <button type='button' aria-label='Drag' className="pin-item__drag" ref={setNodeRef} style={style} {...attributes} {...listeners} >
          <img src={dragIcon} alt="drag icon" />
        </button>
      </div>
    </div>
  )
}

export default PinItem
