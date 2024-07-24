import { useEffect, useState } from "react";

interface EditableProps {
  text?: string;
  placeholder?: string;
  children: React.ReactNode;
  inputRef:
    | React.RefObject<HTMLInputElement>
    | React.RefObject<HTMLTextAreaElement>;
  onChange: (changes: { [key: string]: string }) => void;
}

export default function Editable({
  text,
  placeholder,
  children,
  inputRef,
  onChange,
}: EditableProps) {
  const [isEditing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    if (inputRef.current && text !== inputRef.current.value) {
      onChange({ [inputRef.current.name]: inputRef.current.value });
    }
  };

  useEffect(() => {
    if (inputRef.current && isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  return (
    <>
      {isEditing ? (
        <div onBlur={handleBlur}>{children}</div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || "Editable content"}</span>
        </div>
      )}
    </>
  );
}
