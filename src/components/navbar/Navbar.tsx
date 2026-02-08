import { useState } from "react";
import { X, Menu} from "lucide-react";
import { PAGES } from "../../types";
import { motion } from "framer-motion";

export default function Navbar({
  setCurrentPage,
  currentPage,
  userName = "User",
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<{ page: string; id: number }>>;
  currentPage: {
    page: string;
    id: number;
  };
  userName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* NAVBAR */}
      <header className="glass w-full z-50 backdrop-blur-xl border-b border-white/10">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="text-gray-700 text-2xl font-semibold tracking-wide">
            {userName.charAt(0)}
            <span className="text-[#a855f7]">{userName.charAt(1)}</span>
            {userName.slice(2)}
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-6 text-sm">
            {PAGES.map((item, index) => {
              const isActive = currentPage?.page === item;
              const isContact = item === "contact";

              return (
                <motion.li
                  key={item}
                  onClick={() => setCurrentPage({ page: item, id: 1 })}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -2 }}
                  className={`cursor-pointer uppercase tracking-wide px-4 py-2 rounded-xl transition-all duration-300
                    ${
                      isContact
                        ? isActive
                          ? "bg-[#a855f7] text-white font-semibold"
                          : "bg-black text-white hover:bg-[#a855f7]"
                        : isActive
                        ? "text-[#a855f7] font-bold"
                        : "text-gray-700 hover:text-[#a855f7]"
                    }
                  `}
                >
                  {item}
                </motion.li>
              );
            })}
          </ul>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-black hover:text-[#a855f7] transition-colors duration-300"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl"
      >
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-[#a855f7] transition-colors duration-300"
        >
          <X size={26} />
        </button>

        {/* MOBILE CONTENT */}
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
          {PAGES.map((item, index) => (
            <motion.span
              key={item}
              onClick={() => {
                setCurrentPage({ page: item, id: 1 });
                setOpen(false);
              }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{ scale: 1.08 }}
              className={`cursor-pointer uppercase transition-all duration-300
                ${
                  currentPage?.page === item
                    ? "text-[#a855f7] font-extrabold border-b-2 border-[#a855f7]"
                    : "text-white/70 hover:text-[#a855f7]"
                }
              `}
            >
              {item}
            </motion.span>
          ))}

          
        </div>
      </motion.div>
    </div>
  );
}
