import { createPortal } from "react-dom";
import "./loader.css";


interface LoaderProps {
  visible?: boolean;
  text?: string; // optional loader text
}

const Loader = ({ visible = true, text = "Loading..." }: LoaderProps) => {
  return createPortal(
    <div
      className="loader-overlay"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
      }}
      aria-hidden={!visible}
    >
      <div className="loader"></div>
      {text && <div className="loader-text">{text}</div>}
    </div>,
    document.body
  );
};

export default Loader;
