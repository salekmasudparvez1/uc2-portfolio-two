
import { motion } from "framer-motion";


const variants = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
} as const;

const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } as const;

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className }: PageWrapperProps) => {


  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className={`w-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
