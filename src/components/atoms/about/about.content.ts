import type { AboutSectionData } from "./about.types";

export const aboutSections: AboutSectionData[] = [
    {
        id: "intro",
        badge: "About",
        title: "Hi, I'm Kerlos",
        subtitle: "Creative Technologist",
        description: "A multidisciplinary creator working across design, development and motion. I partner with brands and studios to turn ideas into interfaces and films that feel alive.",
        align: "left",
        // actions: [
        //     { label: "Vie   w My Work", variant: "primary", href: "/" },
        //     { label: "Let's Talk", variant: "secondary", href: "https://cal.com/kerlos-magdy-yaumvr/15min", external: true },
        // ],
    },
    {
        id: "approach",
        badge: "Philosophy",
        title: "Design Meets",
        subtitle: "Engineering",
        description: "I believe great digital experiences live at the intersection of clear visual thinking and solid engineering. Every project starts with a story and ends with code that performs as good as it looks.",
        align: "center",
    },
    {
        id: "services",
        badge: "What I Do",
        title: "Where I",
        subtitle: "Add Value",
        description: "From first sketch to final deploy, I move fluidly across three disciplines to keep every detail intentional.",
        align: "left",
        features: [
            { title: "Design", description: "Interfaces and visual systems built around clarity and motion." },
            { title: "Development", description: "Performant, accessible web experiences from prototype to production." },
            { title: "Motion", description: "Storytelling through animation, transitions and interactive detail." },
        ],
    },
    {
        id: "details",
        badge: "Get to Know Me",
        title: "A Little",
        subtitle: "About Me",
        description: "The essentials — where I'm from, what I studied, and how to reach me.",
        align: "left",
        details: [
            { label: "Age", value: "26" },
            { label: "Location", value: "Cairo, Egypt" },
            { label: "Graduated From", value: "Thebes Academy — Computer Science (GPA 3.1)" },
            { label: "Phone", value: "+20 101 908 5973" },
        ],
        cvEmbedUrl: "https://drive.google.com/file/d/1kSVB_SEFsOQqvbqo_3lGs4j8PTFWtPUT/preview",
    },
    {
        id: "cta",
        badge: "Let's Connect",
        title: "Let's Build",
        subtitle: "Something Together",
        description: "Have a project in mind or just want to say hi? I'm always open to new collaborations and interesting problems to solve.",
        align: "center",
        actions: [
            { label: "Start a Conversation", variant: "primary", href: "https://cal.com/kerlos-magdy-yaumvr/15min", external: true },
            { label: "Back to Home", variant: "secondary", href: "/" },
        ],
    },
];

export default aboutSections;
