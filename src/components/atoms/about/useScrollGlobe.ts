import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GlobeConfig } from "./about.types";

const parsePercent = (str: string): number => parseFloat(str.replace('%', ''));

const buildTransform = (top: number, left: number, scale: number) =>
    `translate3d(${left}vw, ${top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`;

export function useScrollGlobe(globeConfig: GlobeConfig) {
    const [activeSection, setActiveSection] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [globeTransform, setGlobeTransform] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationFrameId = useRef<number | null>(null);

    const calculatedPositions = useMemo(() => {
        return globeConfig.positions.map(pos => ({
            top: parsePercent(pos.top),
            left: parsePercent(pos.left),
            scale: pos.scale
        }));
    }, [globeConfig.positions]);

    const updateScrollPosition = useCallback(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

        setScrollProgress(progress);

        const viewportCenter = window.innerHeight / 2;
        let newActiveSection = 0;
        let minDistance = Infinity;

        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    newActiveSection = index;
                }
            }
        });

        const currentPos = calculatedPositions[newActiveSection];
        setGlobeTransform(buildTransform(currentPos.top, currentPos.left, currentPos.scale));
        setActiveSection(newActiveSection);
    }, [calculatedPositions]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                animationFrameId.current = requestAnimationFrame(() => {
                    updateScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateScrollPosition();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [updateScrollPosition]);

    useEffect(() => {
        const initialPos = calculatedPositions[0];
        setGlobeTransform(buildTransform(initialPos.top, initialPos.left, initialPos.scale));
    }, [calculatedPositions]);

    return { containerRef, sectionRefs, scrollProgress, activeSection, globeTransform };
}
