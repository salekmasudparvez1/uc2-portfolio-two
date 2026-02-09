

import { createContext, useContext, type ReactNode, useRef } from "react";
import { motionValue, MotionValue } from "motion/react";

interface ActiveSectionContextType {
  activeSection: MotionValue<string>;
  scrollLockUntilRef: React.MutableRefObject<number>;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {

  const activeSection = motionValue<string>("home");
  const scrollLockUntilRef = useRef(0);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, scrollLockUntilRef }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      "useActiveSection must be used within ActiveSectionProvider"
    );
  }
  return context;
}
