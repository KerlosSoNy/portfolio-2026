"use client";

import { Links } from "@/lib/constant/links";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`relative z-20 font-en bg-transparent backdrop-blur-3xl flex flex-col justify-center gap-10  text-main w-full py-12 xl:h-125.25 xl:py-0 px-6 2xs:px-8 md:px-12 lg:px-16 xl:px-25 3xl:px-50.5 transition-all duration-700 ease-out ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
                }`}
        >
            {/* <div className="w-screen h-full backdrop-blur-lg fixed top-0" /> */}
            <div className="flex flex-col md:flex-row items-start z-10 bg-transparent justify-between gap-10 md:gap-8 w-full">
                <div className="flex flex-col items-start gap-4">
                    <Image
                        src="/images/logos/KM.png"
                        alt={"logo"}
                        width={278}
                        height={70}
                        loading="eager"
                        className="w-40 2xs:w-48 md:w-69.5 h-auto"
                    />
                </div>
                <div className="flex flex-col ">
                    <span className="text-text-secondary font-bold text-5">{"Links"}</span>
                    <div className="w-full grid grid-cols-2 gap-2.5 mt-8 max-w-84.25">
                        <div className="flex flex-col gap-5">
                            {
                                Links?.slice(0, 5).map((link, index) => {
                                    return (
                                        <Link href={link?.href} key={index} className="text-6 w-full max-w-41 text-text-placeholder hover:text-main transition-colors">
                                            {link.key.charAt(0).toUpperCase() + link.key.slice(1)}
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        {/* <div className="flex flex-col gap-5">
                            {
                                Links?.slice(5, 8).map((link, index) => {
                                    return (
                                        <Link href={link?.href} key={index} className="text-6 w-full max-w-41 text-text-placeholder hover:text-main transition-colors">
                                            {(link.key)}
                                        </Link>
                                    )
                                })
                            }
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-text-secondary font-bold text-5">Find Me</span>
                    <div className="flex flex-col mt-7">
                        <span className="text-6 text-text-disabled">
                            Call Me
                        </span>
                        <Link href="tel:+201019085973" dir="ltr" className="text-6 text-text-secondary hover:text-main transition-colors text-start"   >
                            +201019085973
                        </Link>
                    </div>
                    <div className="flex flex-col mt-8">
                        <span className="text-6 text-text-disabled">
                            Email
                        </span>
                        <Link href="mailto:Kerlosssony@gmail.com" className="text-6 text-text-secondary hover:text-main transition-colors"   >
                            Kerlosssony@gmail.com
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-[#D2D2D2]" />
            <span className="text-6 text-text-disabled mx-auto text-center">{"Copyright © 2026 Kerlos Magdy"}</span>
        </div>
    );
}