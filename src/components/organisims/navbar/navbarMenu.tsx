"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Links } from "@/lib/constant/links";
import MobileMenu from "./mobileMenu";
import { MenuIcon } from "@/components/icons/menuIcon";
import { cn } from "@/lib/functions/utils";
import TransitionLink from "@/components/shared/transitionsLink/TransitionLink";
import MagneticComponent from "@/components/atoms/Magnitc/Magnitc";

const listVariants = {
    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
};


export default function NavbarMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const showLinks = isOpen || isDrawerOpen;

    return (
        <div className="relative flex flex-row items-center">
            <div className="hidden xl:flex xl:flex-row xl:items-center">
                <AnimatePresence>
                    {showLinks && (
                        <motion.ul
                            initial={isHome ? "hidden" : false}
                            animate="visible"
                            exit="hidden"
                            variants={listVariants}
                            className="flex flex-row items-center gap-3 2xl:gap-6 me-6"
                        >
                            {Links.map((link, index) => (
                                <motion.li
                                    key={link.href ?? index}
                                    variants={itemVariants}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="list-none whitespace-nowrap"
                                >
                                    <MagneticComponent>
                                        <TransitionLink pathname={pathname} link={link} />
                                    </MagneticComponent>
                                </motion.li>
                            ))}

                        </motion.ul>
                    )}
                </AnimatePresence>

                <div
                    className={`flex flex-row items-center gap-3 me-6 cursor-pointer select-none `}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <MenuIcon isOpen={isOpen} />
                </div>
            </div>

            <button
                type="button"
                aria-label={"Open mobile menu"}
                onClick={() => setIsDrawerOpen(true)}
                className={cn(
                    "flex h-10 w-10 items-center justify-center xl:hidden",
                )}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 7H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <path d="M4 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
            </button>

            <MobileMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </div>
    );
}