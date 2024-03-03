"use client";

import { useState } from "react";
import SingleLink from "./SingleLink";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

export type LinksProps = {
  txt: string;
  headline?: boolean;
  link?: string;
  visible: boolean;
  img?: string;
  id: string;
};

const LinksContainer = () => {
  const [items, setItems] = useState([
    { id: 1, t: "A" },
    { id: 2, t: "1" },
  ]);
  const [links, setLinks] = useState<LinksProps[]>([]);

  const createNewLink = () => {
    const newLink = {
      id: uuidv4(),
      visible: true,
      txt: "",
      link: "",
      img: "",
    };

    setLinks([newLink, ...links]);

    setItems([{ id: Math.floor(Math.random() * 100), t: "" }, ...items]);
  };

  const createNewHeadLine = () => {
    const newHeadline = {
      id: uuidv4(),
      visible: true,
      txt: "",
      headline: true,
    };

    setLinks([newHeadline, ...links]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={createNewHeadLine}
          className="px-7 py-1.5 rounded-full text-base shadow-xl text-neutral-500 transition-shadow duration-300 active:shadow-md border bg-white font-medium"
        >
          Add Header
        </button>
        <button
          onClick={createNewLink}
          className="px-7 py-1.5 rounded-full text-base bg-blue-500 shadow-xl transition-shadow duration-300 active:shadow-md text-white font-medium"
        >
          Add New Link
        </button>
      </div>
      <div className="flex flex-col mt-11 gap-y-4">
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          {links.map((link, i) => (
            <SingleLink key={link.id} link={link} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLinks((items) => {
        const oldIndex = links.findIndex((item) => item.id === active.id);
        const newIndex = links.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};
export default LinksContainer;
