import { useEffect, useRef, useState } from "react";

interface EditableTextProps {
  value?: string;
  onUpdate: (value: string) => void;
  className?: string;
  multiline?: boolean;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}

export const EditableText = ({
  value = "",
  onUpdate,
  className = "",
  multiline = false,
  onEditStart,
  onEditEnd,
}: EditableTextProps) => {
  const ref = useRef<HTMLSpanElement | HTMLParagraphElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (ref.current && !isEditing) {
      ref.current.innerText = value;
    }
  }, [value, isEditing]);

  const handleFocus = () => {
    setIsEditing(true);
    onEditStart?.();
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEditEnd?.();
    onUpdate(ref.current?.innerText.trim() || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  const Component = multiline ? "p" : "span";

  return (
    <Component
      ref={ref as React.RefObject<HTMLParagraphElement>}
      contentEditable
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`
        cursor-text outline-none
        ${isEditing ? "ring-1 ring-green-600/40 rounded-md px-1" : ""}
        ${className}
      `}
    />
  );
};
