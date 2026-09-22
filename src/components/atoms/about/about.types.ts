export interface AboutFeature {
    title: string;
    description: string;
}

export interface AboutDetail {
    label: string;
    value: string;
}

export interface AboutAction {
    label: string;
    variant: 'primary' | 'secondary';
    href?: string;
    external?: boolean;
    onClick?: () => void;
}

export interface AboutSectionData {
    id: string;
    badge?: string;
    title: string;
    subtitle?: string;
    description: string;
    align?: 'left' | 'center' | 'right';
    features?: AboutFeature[];
    actions?: AboutAction[];
    details?: AboutDetail[];
    cvEmbedUrl?: string;
}

export interface GlobePosition {
    top: string;
    left: string;
    scale: number;
}

export interface GlobeConfig {
    positions: GlobePosition[];
}
