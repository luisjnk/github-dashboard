export interface IUsers {
    total_count: number,
    incomplete_results: number,
    items: Array<IUser>
  }
  
  export interface IUser {
    login?: string,
    id?: number
    node_id?: string,
    avatar_url: string,
    gravatar_id?: string,
    url?: string,
    html_url: string,
    followers_url: string,
    following_url?: string,
    gists_url?: string,
    starred_url?: string,
    subscriptions_url?: string,
    organizations_url?: string,
    repos_url: string,
    events_url?: string,
    received_events_url?: string,
    type?: string,
    site_admin?: boolean
    score?: number
  }
  
  export interface IUserDetails {
    login: string,
    id: number,
    node_id?: string,
    avatar_url: string,
    gravatar_id?: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url?: string,
    gists_url?: string,
    starred_url?: string,
    repos_url: string,
    type?: string,
    name?: string,
    email?: string,
    public_repos?: number,
    followers: number
    following?: number,
  }