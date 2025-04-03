import { Exercise } from '@/types/exercise';
import React from 'react';

interface ReorderableListProps {
  items: Pick<Exercise, 'id' | 'name'>[];
  onReorder: (newOrder: Pick<Exercise, 'id' | 'name'>[]) => void;
}

export default function ReorderableList({
  items,
  onReorder,
}: ReorderableListProps) {
  // Function to move an item up in the list.
  const moveUp = (index: number) => {
    if (index === 0) return; // first item cannot move up
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [
      newItems[index],
      newItems[index - 1],
    ];
    onReorder(newItems);
  };

  // Function to move an item down in the list.
  const moveDown = (index: number) => {
    if (index === items.length - 1) return; // last item cannot move down
    const newItems = [...items];
    [newItems[index + 1], newItems[index]] = [
      newItems[index],
      newItems[index + 1],
    ];
    onReorder(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 border-b border-gray-200"
        >
          <div className="flex-1">{item.name}</div>
          <div className="flex space-x-2">
            <button
              className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
              onClick={() => moveUp(index)}
              disabled={index === 0}
              title="Move Up"
            >
              ▲
            </button>
            <button
              className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
              onClick={() => moveDown(index)}
              disabled={index === items.length - 1}
              title="Move Down"
            >
              ▼
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
