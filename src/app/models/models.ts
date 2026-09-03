export interface Owner {
    id: string;
    url: string;
    login: string;
    avatar_url: string | null;
}

export interface Language {
    id: string;
    color: string;
    name: string;
}

export interface Admin {
    id: string;
    bio: string | null;
    avatarUrl: string;
    company: string | null;
    createdAt: string;
    email: string | null;
    location: string | null;
    login: string;
    name: string | null;
    url: string;
    websiteUrl: string | null;
    stargazerCount: number;
}

export interface Repository {
    id: string;
    createdAt: string | null;
    description: string | null;
    diskUsage: number;
    forkCount: number;
    homepageUrl: string | null;
    isArchived: boolean;
    name: string;
    pushedAt: string | null;
    sshUrl: string;
    stargazerCount: number;
    url: string;
    license: License | null;
    readmeUrl: string | null;
    primaryLanguage: Language | null;
    owner: Owner;
    ownerStarred: Admin;
    topics: Topic[] | null;
}

export interface Topic {
    id: string;
    name: string;
    stargazerCount: number;
}

export interface TopicXRepository {
    idRepo: string;
    idTopic: string;
}

export interface License {
    id: string;
    name: string;
    url: string;
}
