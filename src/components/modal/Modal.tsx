import { createPortal } from "react-dom";
import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = memo(({ onClose, children }: ModalProps) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        onClick={() =>
            onClose()
        }
        className="
    absolute top-6 right-6 z-20
    rounded-full bg-white/80 backdrop-blur
    p-2 shadow hover:bg-white transition
  "
      >
        <X size={20} />
      </button>

      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal content wrapper */}
      <div className="relative z-10 h-full w-full overflow-y-auto">
        <div className="min-h-full flex items-start md:items-center justify-center p-4 md:p-10">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
});

export default Modal;
