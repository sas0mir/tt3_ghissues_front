export interface IInputProps {
    title: string,
    value: string,
    onChange: (value: string) => void,
    onSelect: (value: any) => void,
    data: any[]
}

export interface IGHUser {
    //subscriptions_url: string,
    //organizations_url: string,
    //repos_url: string,
    //events_url: string,
    //received_events_url: string,
    type: string,
    //user_view_type: string,
    site_admin: boolean,
    score: number,
    login: string,
    id: number,
    //node_id: string,
    avatar_url: string,
    //gravatar_id: string,
    url: string,
    //html_url: string,
    //followers_url: string,
    //following_url: string,
    //gists_url: string,
    //starred_url: string,
}

export interface IGHRepo {
    allow_forking: boolean,
    archived: boolean,
    created_at: string,
    description: string,
    fork: boolean,
    has_issues: boolean,
    id: number,
    name: string,
    open_issues: number,
    score: number,
    watchers: number
}

export interface IGHIssue {
    id: number
}