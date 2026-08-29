export interface Owner {
    id: string;
    url: string;
    login: string;
    avatarUrl: string | null;
}

export interface Language {
    id: string;
    color: string;
    name: string;
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
    licenseId: string | null;
    readmeUrl: string | null;
    primaryLanguageId: string | null;
    ownerId: string;
    ownerStarredId: string;
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
