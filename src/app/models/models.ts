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
    createda_at: string | null;
    description: string | null;
    disk_usage: number;
    fork_count: number;
    homepage_url: string | null;
    is_archived: boolean;
    name: string;
    pushed_at: string | null;
    ssh_url: string;
    stargazer_count: number;
    url: string;
    license: License | null;
    readme_url: string | null;
    primary_language: Language | null;
    owner: Owner;
    owner_starred: Admin;
    topics: Topic[] | null;
    totalcount: number | null | undefined;
}

export interface Topic {
    id: string;
    name: string;
    stargazerCount: number;
    totalcount: number | null | undefined;
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
