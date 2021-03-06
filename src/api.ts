import axios, { CancelToken } from 'axios'
import { Gist_API, UsersGistsResponse } from './types'

const GISTS_PER_PAGE = 100

export function fetchUsersGists(username: string, cancelToken?: CancelToken): Promise<Gist_API[]> {
  return fetchUsersGistsRecursively(username, cancelToken)
}

async function fetchUsersGistsRecursively(
  username: string,
  cancelToken?: CancelToken,
  page: number = 1
): Promise<Gist_API[]> {
  try {
    const { data: gists } = await axios.get<UsersGistsResponse>(
      `https://api.github.com/users/${username}/gists`,
      {
        cancelToken,
        params: {
          per_page: GISTS_PER_PAGE,
          page
        }
      }
    )

    if (gists && gists.length && gists.length >= GISTS_PER_PAGE) {
      return [...gists, ...(await fetchUsersGistsRecursively(username, cancelToken, page + 1))]
    } else {
      return gists
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      return []
    } else {
      throw error
    }
  }
}

export async function fetchGist(gistId: string, cancelToken?: CancelToken): Promise<Gist_API | null> {
  try {
    const { data: gist } = await axios.get<Gist_API>(`https://api.github.com/gists/${gistId}`, {
      cancelToken
    })
    return gist
  } catch (error) {
    if (axios.isCancel(error)) {
      return null
    } else {
      throw error
    }
  }
}
