export interface GistOwner_API {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string
  url: string
}

export interface Gist_API {
  comments: number
  comments_url: string
  commits_url: string
  created_at: string
  description: string
  files: GistFile_API[]
  forks_url: string
  git_pull_url: string
  git_push_url: string
  html_url: string
  id: string
  node_id: string
  owner: GistOwner_API
  public: boolean
  truncated: boolean
  updated_at: string
  url: string
  // user: null
}

export interface GistFile_API {
  content: string
  filename: string
  language: string
  raw_url: string
  size: number
  truncated: boolean
  type: string
}

export type UsersGistsResponse = Gist_API[]

export enum LoadingStatus {
  Loading = 'loading',
  FailedLoading = 'failed-loading',
  SuccessfullyLoaded = 'successfully-loaded'
}
