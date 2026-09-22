interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-0.5 bg-linear-to-r from-border/20 via-border/40 to-border/20 z-50">
            <div
                className="h-full bg-linear-to-r from-primary via-[#8B0000]/50 to-white/50 will-change-transform shadow-sm"
                style={{
                    transform: `scaleX(${progress})`,
                    transformOrigin: 'left center',
                    transition: 'transform 0.15s ease-out',
                    filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))'
                }}
            />
        </div>
    );
}

export default ProgressBar;
