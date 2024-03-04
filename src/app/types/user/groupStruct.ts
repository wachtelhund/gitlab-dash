export interface GLAuthor {
    name: string;
    avatarUrl: string;
    webUrl: string;
}

export interface GLCommit {
    author: GLAuthor;
    committedDate: string;
}

export interface GLRepository {
    tree: {
        lastCommit: GLCommit;
    };
}

export interface GLProject {
    name: string;
    webUrl: string;
    avatarUrl: string;
    fullPath: string;
    repository: GLRepository;
}

export interface GLGroup {
    name: string;
    webUrl: string;
    avatarUrl: string;
    fullPath: string;
    projects: {
        nodes: GLProject[];
    };
}

export interface GLGroupsResponse {
    data: {
        currentUser: {
            username: string;
            groups: {
                nodes: GLGroup[];
            };
        };
    }
}