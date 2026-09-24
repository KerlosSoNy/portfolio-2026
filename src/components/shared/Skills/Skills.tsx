
"use client"
import LiquidGlass from 'liquid-glass-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import React, { useEffect, useState, memo, forwardRef } from 'react';
import { fadeUp } from '../AboutSection';
import { WordsPullUp } from '../NewHero';

// --- Type Definitions ---
type IconType = 'html' | 'css' | 'javascript' | 'react' | 'node' | 'tailwind' | 'nextjs';

type GlowColor = 'cyan' | 'purple' | 'red' | 'black' | 'white';

interface SkillIconProps {
    type: IconType;
}

interface SkillConfig {
    id: string;
    orbitRadius: number;
    size: number;
    speed: number;
    iconType: IconType;
    phaseShift: number;
    glowColor: GlowColor;
    label: string;
}

interface OrbitingSkillProps {
    config: SkillConfig;
}

interface GlowingOrbitPathProps {
    radius: number;
    glowColor?: GlowColor;
    animationDelay?: number;
}

const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
    html: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26" />
            </svg>
        ),
        color: '#E34F26'
    },
    css: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6" />
            </svg>
        ),
        color: '#1572B6'
    },
    javascript: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <rect width="24" height="24" fill="#F7DF1E" />
                <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330" />
            </svg>
        ),
        color: '#F7DF1E'
    },
    react: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <g stroke="#61DAFB" strokeWidth="1" fill="none">
                    <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
                </g>
            </svg>
        ),
        color: '#61DAFB'
    },
    node: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933" />
            </svg>
        ),
        color: '#339933'
    },
    tailwind: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4" />
            </svg>
        ),
        color: '#06B6D4'
    },
    nextjs: {
        component: () => (
            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.5 4.5L4.90534 4.20725C4.77836 4.03144 4.55252 3.95753 4.34617 4.02425C4.13981 4.09098 4 4.28313 4 4.5H4.5ZM7.5 14C3.91015 14 1 11.0899 1 7.5H0C0 11.6421 3.35786 15 7.5 15V14ZM14 7.5C14 11.0899 11.0899 14 7.5 14V15C11.6421 15 15 11.6421 15 7.5H14ZM7.5 1C11.0899 1 14 3.91015 14 7.5H15C15 3.35786 11.6421 0 7.5 0V1ZM7.5 0C3.35786 0 0 3.35786 0 7.5H1C1 3.91015 3.91015 1 7.5 1V0ZM5 12V4.5H4V12H5ZM4.09466 4.79275L10.5947 13.7927L11.4053 13.2073L4.90534 4.20725L4.09466 4.79275ZM10 4V10H11V4H10Z" fill="#ffffff"></path> </g></svg>),
        color: '#1572B6'
    }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
    const IconComponent = iconComponents[type]?.component;
    return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig: SkillConfig[] = [
    // Inner Orbit
    {
        id: 'html',
        orbitRadius: 100,
        size: 40,
        speed: 1,
        iconType: 'html',
        phaseShift: 0,
        glowColor: 'red',
        label: 'HTML5'
    },
    {
        id: 'css',
        orbitRadius: 100,
        size: 45,
        speed: 1,
        iconType: 'css',
        phaseShift: (2 * Math.PI) / 3,
        glowColor: 'cyan',
        label: 'CSS3'
    },
    {
        id: 'javascript',
        orbitRadius: 100,
        size: 40,
        speed: 1,
        iconType: 'javascript',
        phaseShift: (4 * Math.PI) / 3,
        glowColor: 'cyan',
        label: 'JavaScript'
    },
    // Outer Orbit
    {
        id: 'react',
        orbitRadius: 180,
        size: 50,
        speed: -0.6,
        iconType: 'react',
        phaseShift: 0,
        glowColor: 'purple',
        label: 'React'
    },
    {
        id: 'node',
        orbitRadius: 180,
        size: 45,
        speed: -0.6,
        iconType: 'node',
        phaseShift: (2 * Math.PI) / 3,
        glowColor: 'purple',
        label: 'Node.js'
    },
    {
        id: 'tailwind',
        orbitRadius: 180,
        size: 40,
        speed: -0.6,
        iconType: 'tailwind',
        phaseShift: (4 * Math.PI) / 3,
        glowColor: 'purple',
        label: 'Tailwind CSS'
    },
    {
        id: 'nextjs',
        orbitRadius: 180,
        size: 40,
        speed: -0.6,
        iconType: 'nextjs',
        phaseShift: (5 * Math.PI) / 3,
        glowColor: 'white',
        label: 'Next.js'
    },
];

// --- Memoized Orbiting Skill Component ---
// Position is written directly to the DOM by the parent's animation loop (no per-frame re-render).
const OrbitingSkill = memo(forwardRef<HTMLDivElement, OrbitingSkillProps>(({ config }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const { size, iconType, label } = config;

    return (
        <div
            ref={ref}
            className="absolute top-0 left-0 will-change-transform"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                zIndex: isHovered ? 20 : 10,
            }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setIsHovered(false)}
            onClick={() => setIsHovered(h => !h)}
        >
            <div
                className={`
          relative w-full h-full p-2 bg-gray-800/90
          rounded-full flex items-center justify-center
          transition-[transform,box-shadow] duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
                style={{
                    boxShadow: isHovered
                        ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
                        : undefined
                }}
            >
                <SkillIcon type={iconType} />
                {isHovered && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
}));
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
    const glowColors = {
        cyan: {
            primary: 'rgba(6, 182, 212, 0.4)',
            secondary: 'rgba(6, 182, 212, 0.2)',
            border: 'rgba(6, 182, 212, 0.3)'
        },
        purple: {
            primary: 'rgba(147, 51, 234, 0.4)',
            secondary: 'rgba(147, 51, 234, 0.2)',
            border: 'rgba(147, 51, 234, 0.3)'
        },
        black: {
            primary: 'rgba(0, 0, 0, 0.4)',
            secondary: 'rgba(0, 0, 0, 0.2)',
            border: 'rgba(0, 0, 0, 0.3)'
        },
        red: {
            primary: 'rgba(139, 0, 0, 0.4)',
            secondary: 'rgba(139, 0, 0, 0.2)',
            border: 'rgba(139, 0, 0, 0.3)'
        },
        white: {
            primary: 'rgba(255, 255, 255, 0.4)',
            secondary: 'rgba(255, 255, 255, 0.2)',
            border: 'rgba(255, 255, 255, 0.3)'
        }
    };

    const colors = glowColors[glowColor] || glowColors.cyan;

    return (
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                animationDelay: `${animationDelay}s`,
            }}
        >
            {/* Glowing background */}
            <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                    background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
                    boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
                    animation: 'pulse 4s ease-in-out infinite',
                    animationDelay: `${animationDelay}s`,
                }}
            />

            {/* Static ring for depth */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    border: `1px solid ${colors.border}`,
                    boxShadow: `inset 0 0 20px ${colors.secondary}`,
                }}
            />
        </div>
    );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

interface SkillCategory {
    title: string;
    description: string;
    skills: string[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend",
        description: "Building interfaces that feel fast and precise.",
        skills: ["React", "Next.js", "TypeScript", "JavaScript"],
    },
    {
        title: "Styling & Motion",
        description: "Bringing layouts to life with detail and rhythm.",
        skills: ["Tailwind CSS", "Framer Motion", "GSAP", "CSS3"],
    },
    {
        title: "Tooling & Backend",
        description: "The workflow and services behind the interface.",
        skills: ["Node.js", "Git", "REST APIs", "Vercel"],
    },
];

// --- Orbit Visual ---
// Designed at a fixed stage size, then scaled to fit the container on small screens.
const STAGE_SIZE = 450;

const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'black', delay: 0 },
    { radius: 180, glowColor: 'black', delay: 1.5 }
];

function SkillsOrbit() {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
    const pausedRef = useRef(false);
    const [scale, setScale] = useState(1);

    // Fit the stage to the available width
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setScale(Math.min(1, entry.contentRect.width / STAGE_SIZE));
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Animate positions via refs; only runs while the orbit is on screen
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let animationFrameId = 0;
        let lastTime = 0;
        let time = 0;

        const place = () => {
            skillsConfig.forEach((config, i) => {
                const node = iconRefs.current[i];
                if (!node) return;
                const angle = time * config.speed + config.phaseShift;
                const x = STAGE_SIZE / 2 + Math.cos(angle) * config.orbitRadius - config.size / 2;
                const y = STAGE_SIZE / 2 + Math.sin(angle) * config.orbitRadius - config.size / 2;
                node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        };

        const animate = (currentTime: number) => {
            if (lastTime && !pausedRef.current) {
                time += Math.min((currentTime - lastTime) / 1000, 0.1);
                place();
            }
            lastTime = currentTime;
            animationFrameId = requestAnimationFrame(animate);
        };

        place();
        if (reduceMotion) return;

        const observer = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(animationFrameId);
            if (entry.isIntersecting) {
                lastTime = 0;
                animationFrameId = requestAnimationFrame(animate);
            }
        });
        observer.observe(el);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-[450px] mx-auto"
            style={{ height: STAGE_SIZE * scale }}
        >
            <div
                className="absolute top-0 left-1/2 flex items-center justify-center"
                style={{
                    width: STAGE_SIZE,
                    height: STAGE_SIZE,
                    transform: `translateX(-50%) scale(${scale})`,
                    transformOrigin: 'top center',
                }}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') pausedRef.current = true; }}
                onPointerLeave={(e) => { if (e.pointerType === 'mouse') pausedRef.current = false; }}
            >

                {/* Central "Code" Icon with enhanced glow */}
                {/* <LiquidGlass className="w-20 h-20 mt-7 ms-3"> */}
                <div className="w-20 h-22  rounded-full flex items-center justify-center z-10 relative shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-black/30 blur-xl animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-black blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#06B6D4" />
                                    <stop offset="100%" stopColor="#9333EA" />
                                </linearGradient>
                            </defs>
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </div>
                </div>
                {/* </LiquidGlass> */}

                {/* Render glowing orbit paths */}
                {orbitConfigs.map((config) => (
                    <GlowingOrbitPath
                        key={`path-${config.radius}`}
                        radius={config.radius}
                        glowColor={config.glowColor}
                        animationDelay={config.delay}
                    />
                ))}

                {/* Render orbiting skill icons */}
                {skillsConfig.map((config, i) => (
                    <OrbitingSkill
                        key={config.id}
                        ref={(node) => { iconRefs.current[i] = node; }}
                        config={config}
                    />
                ))}
            </div>
        </div>
    );
}

// --- Main Section ---
export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const watermarkY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full font-en! z-10 overflow-hidden bg-transparent text-white py-20 md:py-45"
        >
            <motion.span
                aria-hidden
                style={{ y: watermarkY }}
                className="pointer-events-none absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] font-medium leading-none tracking-tighter text-white/20 sm:text-[18vw]"
            >
                Skills
            </motion.span>

            <div className="relative grid max-w-[1800px] mx-auto grid-cols-12 gap-x-4 gap-y-14 px-4 sm:px-6 md:px-10">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={fadeUp}
                    className="col-span-12 flex items-center gap-4"
                >
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 sm:text-sm">
                        04 / Skills
                    </span>
                    <motion.span
                        style={{ scaleX: lineScale }}
                        className="h-px flex-1 origin-left bg-white/20"
                    />
                </motion.div>

                <div className="col-span-12 lg:col-span-8">
                    <h2
                        className="font-medium leading-[1.05] tracking-[-0.03em] text-[9vw] sm:text-[7vw] md:text-[4.5vw] lg:text-[3.6vw]"
                        style={{ color: "#E1E0CC" }}
                    >
                        <WordsPullUp text="Tools I reach for to bring ideas to life." />
                    </h2>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={1}
                    className="col-span-12 flex flex-col justify-end gap-8 lg:col-span-4"
                >
                    <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                        A stack built around React and Next.js, refined with motion and
                        typed for reliability — from first pixel to production deploy.
                    </p>
                </motion.div>

                <div className="col-span-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                        {skillCategories.map((category, i) => (
                            <motion.div
                                key={category.title}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={fadeUp}
                                custom={i}
                                className="group relative flex flex-col gap-4 bg-black/40 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-black/20 sm:p-8"
                            >
                                <div className="flex flex-row items-center gap-3">
                                    <span className="text-xs text-white/40">0{i + 1}</span>
                                    <h3 className="text-lg font-medium sm:text-xl" style={{ color: "#E1E0CC" }}>
                                        {category.title}
                                    </h3>
                                </div>
                                <p className="text-sm leading-relaxed text-white/50">
                                    {category.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        custom={2}
                        className="flex items-center justify-center"
                    >
                        <SkillsOrbit />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

