import axios from 'axios'
import { Gist_API, UsersGistsResponse } from './types'

const GISTS_PER_PAGE = 100

export function fetchUsersGists(username: string): Promise<Gist_API[]> {
  return fetchUsersGistsRecursively(username)
}


async function fetchUsersGistsRecursively(username: string, page: number = 1): Promise<Gist_API[]> {
  const { data: gists } = await axios.get<UsersGistsResponse>(
    `https://api.github.com/users/${username}/gists`,
    {
      params: {
        per_page: GISTS_PER_PAGE,
        page
      }
    }
  )

  if (gists && gists.length && gists.length >= GISTS_PER_PAGE) {
    return [...gists, ...(await fetchUsersGistsRecursively(username, page + 1))]
  } else {
    return gists
  }
}

export async function fetchGist(gistId: string) {
  const { data: gist } = await axios.get<Gist_API>(`https://api.github.com/gists/${gistId}`)
  return gist
}
