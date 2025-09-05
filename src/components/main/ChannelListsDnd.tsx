import { Fragment, useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragCancelEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Hash, Volume2, ChevronDown, Plus } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type ChannelsListsDnDProps = {
  textChannels: string[];
  voiceChannels: string[];
};

type SectionId = "text" | "voice";


export function Section({
  id,
  title,
  children,
  activeId,
}: {
  id: SectionId;
  title: string;
  children: React.ReactNode;
  activeId: SectionId | null;
}) {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useSortable({
    id,
    animateLayoutChanges: () => false, // keep list static during drag
  });

  const isActive = activeId === id;
  const style: React.CSSProperties = {
    transform: isActive && transform ? CSS.Transform.toString(transform) : undefined,
    transition: "none",
  };

  return (
    <section
      ref={setNodeRef}
      style={style}
      className={[
        "flex flex-col gap-2 w-full rounded-xl select-none transition-none",
        isDragging ? "opacity-70" : "",
      ].join(" ")}
    >
      <div className="flex justify-between items-center text-icon-grey">
        {/* Drag handle = left group ONLY */}
        <div
          className="font-semibold text-sm flex items-center gap-1 cursor-grab active:cursor-grabbing hover:text-white"
          {...attributes}
          {...listeners}
        >
          {title}
          <ChevronDown className="h-3 w-3 shrink-0" />
        </div>

        {/* Plus popover trigger (clickable, no drag) */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-1 text-icon-grey hover:text-white transition-colors"
              aria-label="Add channel"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Plus size={15} />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            side="bottom"
            sideOffset={6}
            className="w-56 p-1 bg-dropdown border border-dropdown-border text-white z-50"
          >
            <button
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-dropdown-hover"
              onClick={() => {
                // TODO: create text channel
                console.log("Create Text Channel");
              }}
            >
              <Hash size={16} className="text-dropdown-icons" />
              <span className="text-sm">Create Text Channel</span>
            </button>

            <button
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-dropdown-hover"
              onClick={() => {
                // TODO: create voice channel
                console.log("Create Voice Channel");
              }}
            >
              <Volume2 size={16} className="text-dropdown-icons" />
              <span className="text-sm">Create Voice Channel</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>

      {children}
    </section>
  );
}

export default function ChannelsListsDnD({
  textChannels,
  voiceChannels,
}: ChannelsListsDnDProps) {
  // order of sections we sort
  const [sections, setSections] = useState<SectionId[]>(["text", "voice"]);

  // green drop-line index (0..sections.length)
  const [indicatorIndex, setIndicatorIndex] = useState<number | null>(null);

  // track active id so only it transforms
  const [activeId, setActiveId] = useState<SectionId | null>(null);

    const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 6 }, // start drag after ~6px movement
    });
    const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 150, tolerance: 5 }, // long-press-ish on touch
    });
    const sensors = useSensors(mouseSensor, touchSensor);

  function onDragStart(e: DragStartEvent) {
    setActiveId(e.active.id as SectionId);
  }

  function onDragCancel(_e: DragCancelEvent) {
    setActiveId(null);
    setIndicatorIndex(null);
  }

  // compute target index using only indices (no rects)
  function onDragOver(e: DragOverEvent) {
    const { active, over } = e;
    if (!over) return setIndicatorIndex(null);

    const from = sections.indexOf(active.id as SectionId);
    const to = sections.indexOf(over.id as SectionId);
    if (from === -1 || to === -1) return setIndicatorIndex(null);

    const insertAt = to + (from < to ? 1 : 0); // down => after, up => before
    setIndicatorIndex(insertAt);
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    setIndicatorIndex(null);
    if (!over || active.id === over.id) return;

    const from = sections.indexOf(active.id as SectionId);
    const to = sections.indexOf(over.id as SectionId);
    if (from === -1 || to === -1) return;

    const insertAt = to + (from < to ? 1 : 0);
    setSections((arr) => {
      const next = [...arr];
      next.splice(insertAt, 0, next.splice(from, 1)[0]);
      return next;
    });
  }

  const renderBody = (id: SectionId) =>
    id === "text" ? (
      <div className="flex flex-col gap-1">
        {textChannels.map((c) => (
          <div
            key={c}
            className="p-1.5 flex gap-2 items-center rounded-lg text-icon-grey hover:text-white hover:bg-light-hover"
          >
            <Hash size={20} className="text-icon-grey" />
            <div className="font-semibold">{c}</div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-1">
        {voiceChannels.map((c) => (
          <div
            key={c}
            className="p-1.5 flex gap-2 items-center rounded-lg text-icon-grey hover:text-white hover:bg-light-hover"
          >
            <Volume2 size={20} className="text-icon-grey" />
            <div className="font-semibold">{c}</div>
          </div>
        ))}
      </div>
    );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div className="pt-3 flex flex-col gap-3">
          {sections.map((id, idx) => (
            <Fragment key={id}>
              {/* green drop line BEFORE this section */}
              {indicatorIndex === idx && <div className="h-0.5 bg-green-500 rounded my-0.5" />}

              <Section
                id={id}
                title={id === "text" ? "Text Channels" : "Voice Channels"}
                activeId={activeId}
              >
                {renderBody(id)}
              </Section>
            </Fragment>
          ))}

          {/* green drop line at the very end */}
          {indicatorIndex === sections.length && (
            <div className="h-0.5 bg-green-500 rounded my-0.5" />
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
