export type ITopUpdates = {
    title: string;
}

export type IAchievement = {
    title: string;
    image?: string;
};

export type IExperience = {
    organisationName: string;
    organisationLogo: string;
    organisationUrl: string;
    description?: string;
    position: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    achievements: IAchievement[]
}

export type IProject = {
    title: string;
    description: string;
    url: string;
    startDate?: string;
    endDate?: string;
    tags?: string[]
}

export type IBlog = {
    title: string;
    description: string;
    url: string;
    startDate?: string;
    endDate?: string;
    tags?: string[]
}