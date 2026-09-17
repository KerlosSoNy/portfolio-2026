import { motion } from "framer-motion";

const topBarVariants = {
    closed: { top: 7, rotate: 0 },
    open: { top: 11, rotate: 45 },
};

const bottomBarVariants = {
    closed: { top: 15, rotate: 0 },
    open: { top: 11, rotate: -45 },
};

export function MenuIcon({ isOpen }: { isOpen: boolean }) {
    return (
        <div className="relative flex items-center justify-center mt-3 bg-transparent w-10 h-10">
            <motion.span
                className="absolute inset-s-0 w-6 bg-white rounded-full"
                style={{ height: 2 }}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={topBarVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.span
                className="absolute inset-s-0 w-6 bg-white rounded-full"
                style={{ height: 2 }}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={bottomBarVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
    );
}