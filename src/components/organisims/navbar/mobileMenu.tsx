"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Links } from "@/lib/constant/links";
import { usePageTransition } from "@/lib/hooks/UsePageTransition";
import { cn } from "@/lib/functions/utils";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function subscribeToNothing() {
    return () => { };
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const mounted = useSyncExternalStore(subscribeToNothing, () => true, () => false);
    const pathname = usePathname();
    const transition = usePageTransition();

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleLinkClick = async (href: string) => {
        onClose();
        await transition(href);
    };

    if (!mounted) return null;

    return createPortal(
        <>
            <div
                aria-hidden="true"
                onMouseDown={onClose}
                className={cn(
                    "fixed inset-0 z-205 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out xl:hidden",
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                )}
            />
            <div
                role="dialog"
                aria-modal="true"
                inert={!isOpen}
                className={cn(
                    "fixed inset-y-0 inset-s-0 z-210 flex h-dvh w-4/5 max-w-xs 2xs:max-w-sm flex-col overflow-y-auto bg-black/30 shadow-2xl transition-transform duration-300 ease-out xl:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full pointer-events-none"
                )}
            >
                <div className="flex flex-row items-center justify-between px-6 py-5">
                    <Image
                        src="/images/logos/KM.png"
                        alt={'Logo'}
                        width={158}
                        height={40}
                        className="filter-teal h-auto w-24"
                    />
                    <button
                        type="button"
                        aria-label={'Close Menu'}
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center text-text-secondary"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-1 flex-col px-6 py-2">
                    <ul className="flex flex-col">
                        {Links.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <li key={link.href} className="border-b border-[#EAEAEA] last:border-none">
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLinkClick(link.href);
                                        }}
                                        className={cn(
                                            "block py-4 font-inter text-4 uppercase text-text-secondary transition-colors",
                                            active && "font-bold text-main"
                                        )}
                                    >
                                        {link.key}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>,
        document.body
    );
}
