interface AboutCvEmbedProps {
    embedUrl: string;
}

export function AboutCvEmbed({ embedUrl }: AboutCvEmbedProps) {
    return (
        <div className="w-full mb-8 sm:mb-10 rounded-lg sm:rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm">
            <iframe
                src={embedUrl}
                title="Kerlos CV"
                loading="lazy"
                allow="autoplay"
                className="w-full h-[60vh] sm:h-[70vh]"
            />
        </div>
    );
}

export default AboutCvEmbed;
