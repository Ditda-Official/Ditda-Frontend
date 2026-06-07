import { useEffect } from "react";

import Button from "@/shared/ui/Button";

type BaseProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
};

type SingleModal = BaseProps & {
  type: "single";
  confirmLabel: string;
  onConfirm: () => void;
};

type DoubleModal = BaseProps & {
  type: "double";
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type ModalProps = SingleModal | DoubleModal;

const Modal = (props: ModalProps) => {
  const { isOpen, title, description, type, confirmLabel, onConfirm, onClose } = props;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-8"
      onClick={onClose}
    >
      <div className="rounded-12 w-114 bg-white p-8" onClick={e => e.stopPropagation()}>
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h2 className="text-heading1-sb whitespace-pre-line text-black">{title}</h2>
          {description && (
            <p className="text-heading3-m text-gray-70 whitespace-pre-line">{description}</p>
          )}
        </div>
        {type === "single" ? (
          <Button variant="medium_primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button variant="medium_tertiary" onClick={props.onCancel}>
              {props.cancelLabel}
            </Button>
            <Button variant="medium_primary" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
