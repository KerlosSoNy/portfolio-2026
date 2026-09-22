import Image from "next/image";

interface FloatingGlobeProps {
    transform: string;
    dimmed: boolean;
}

export function FloatingGlobe({ transform, dimmed }: FloatingGlobeProps) {
    return (
        <div
            className="fixed z-20 pointer-events-none will-change-transform transition-all duration-1400 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
                transform,
                filter: `opacity(${dimmed ? 0.4 : 0.85})`,
            }}
        >
            <div className="scale-75 sm:scale-90 lg:scale-100">
                {/* <Globe /> */}
                <Image
                    src="/images/logos/KM.png"
                    alt={"Logo"}
                    width={158}
                    height={40}
                    priority
                    className="w-20 2xs:w-24 h-auto xl:w-30 earthRotate 20s linear infinite"
                />
            </div>
        </div>
    );
}

export default FloatingGlobe;
