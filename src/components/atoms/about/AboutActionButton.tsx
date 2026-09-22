import Link from "next/link";
import { cn } from "@/lib/functions/utils";
import type { AboutAction } from "./about.types";

interface AboutActionButtonProps {
    action: AboutAction;
    delay: number;
}

export function AboutActionButton({ action, delay }: AboutActionButtonProps) {
    const className = cn(
        "group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-auto inline-flex items-center justify-center",
        action.variant === 'primary'
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30"
            : "border-2 border-border/60 bg-background/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30 text-foreground"
    );

    const content = (
        <>
            <span className="relative z-10">{action.label}</span>
            {action.variant === 'primary' && (
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
        </>
    );

    const style = { animationDelay: `${delay}s` };

    if (action.href && action.external) {
        return (
            <a href={action.href} target="_blank" rel="noreferrer" className={className} style={style}>
                {content}
            </a>
        );
    }

    if (action.href) {
        return (
            <Link href={action.href} className={className} style={style}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={action.onClick} className={className} style={style}>
            {content}
        </button>
    );
}

export default AboutActionButton;
