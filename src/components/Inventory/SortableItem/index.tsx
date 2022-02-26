import { ItemType } from '@/types/items';
import { useDraggable } from '@dnd-kit/core';
import { CSSProperties } from 'react';
import Item from '../Item';

interface Props extends ItemType {
  getInspect: any;
}

const SortableItem = ({ title, description, slot, amount, getInspect, image }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: slot.toString(),
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
    height: isDragging ? '75%' : '100%',
    width: isDragging ? '75%' : '100%',
    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: ' center',
  };

  return (
    <Item
      getInspect={getInspect}
      key={slot}
      amount={amount}
      ref={setNodeRef}
      title={title}
      description={description}
      slot={slot}
      style={style}
      isDragging={isDragging}
      listeners={listeners}
      attributes={attributes}
      image={image}
    />
  );
};

export default SortableItem;
