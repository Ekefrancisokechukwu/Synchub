"use client";

import { useEffect, useState } from "react";
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
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/useCurrentAccount";
import Spinner from "@/components/ui/Spinner";

const LinksContainer = () => {
  const { currentUser } = useCurrentUser();
  const updatelinks = useMutation(api.synchubAccount.updateLinks);

  const [links, setLinks] = useState<LinksProps[]>([]);

  const loading = !currentUser || currentUser === undefined;

  const createNewLink = () => {
    if (!currentUser) return;

    const newLink = {
      id: uuidv4(),
      visible: false,
      txt: "",
      link: "",
      img: "",
    };
    const linksArray = currentUser.links || [];

    updatelinks({
      id: currentUser._id,
      links: [newLink, ...linksArray!],
    });
  };

  const createNewHeadLine = () => {
    if (!currentUser) return;

    const newHeadline = {
      id: uuidv4(),
      visible: false,
      txt: "",
      headline: true,
    };

    updatelinks({
      id: currentUser._id,
      links: [newHeadline, ...currentUser.links!],
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!currentUser?.links) return;
    setLinks(currentUser?.links!);
  }, [currentUser?.links, links]);

  if (loading) {
    return (
      <div className="p-5">
        <Spinner />
      </div>
    );
  }

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
          {currentUser.links !== undefined &&
            links?.map((link) => <SingleLink key={link.id} link={link} />)}
        </SortableContext>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (!currentUser) return;
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLinks((items) => {
        const oldIndex = links.findIndex((item) => item.id === active.id);
        const newIndex = links.findIndex((item) => item.id === over?.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        updatelinks({
          id: currentUser._id!,
          links: newItems,
        });

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};
export default LinksContainer;
