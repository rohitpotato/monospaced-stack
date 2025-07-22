

export interface Article {
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
    icon?: string;
}

export interface Frontmatter {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
}

export interface FooterLink {
    title: string;
    subLinks?: FooterLink[];
}

export interface FooterCategory {
    title: string;
    links: FooterLink[];
}

export interface GeneratedIdea {
    title: string;
    description: string;
}
