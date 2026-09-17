"use client"
import React, { FC } from 'react';
import Link from "next/link";
import { cn } from '@/lib/functions/utils';
import { usePageTransition } from '@/lib/hooks/UsePageTransition';

interface Props {
    active?: boolean,
    disableLinks?: boolean,
    link: {
        key: string,
        href: string
    }
    pathname?: string
    image?: boolean
    children?: React.ReactNode
    onclick?: () => void;
}

const TransitionLink: FC<Props> = ({ active, link, children, onclick }) => {
    const transition = usePageTransition()

    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        await transition(href)
    };

    return (
        <Link aria-label={link.key} onClick={async (e) => {
            if (onclick) {
                onclick()
            }
            await handleTransition(e, link.href)
        }}
            href={link.href}
            className={cn(
                "text-white! font-inter font-normal relative no-focus-ring uppercase text-7 3xl:text-5",
                {
                    "text-white! ": active,
                }
            )}
        >
            {children ? (
                <div className={cn("", {
                    "filter-nav": active
                })}>
                    {children}
                    <span className="sr-only">{link.key}</span>
                </div>
            ) : (
                link.key
            )}
        </Link>
    );
};

export default TransitionLink;
