import React, { useEffect, useState } from 'react'
import { LoadingStatus, Gist_API } from '../../types'
import { fetchUsersGists } from '../../api'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CancelToken = axios.CancelToken

export function UsersGistsScene({ username }: { username: string }) {
  const [gists, setGists] = useState<Gist_API[]>()
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(LoadingStatus.Loading)

  const usernameLowerCase = username.toLowerCase()

  useEffect(() => {
    let didCancel = false
    document.title = `${usernameLowerCase}'s gists`

    const cancelTokenSource = CancelToken.source()
    ;(async () => {
      try {
        const gists = await fetchUsersGists(usernameLowerCase, cancelTokenSource.token)
        if (didCancel) {
          return
        }
        setStatus(LoadingStatus.SuccessfullyLoaded)
        setGists(gists)
      } catch (error) {
        if (didCancel) {
          return
        }
        setStatus(LoadingStatus.FailedLoading)
        setError(error)
      }
    })()

    return () => {
      didCancel = true
      cancelTokenSource.cancel()
    }
  }, [usernameLowerCase])

  return (
    <>
      <h1>{usernameLowerCase}</h1>
      {(() => {
        switch (status) {
          case LoadingStatus.Loading:
            return <>Wait a sec! Loading users gists...</>
          case LoadingStatus.SuccessfullyLoaded:
            return gists && gists.length ? <Gists gists={gists} /> : <>No Gists found.</>
          case LoadingStatus.FailedLoading:
            return <>Failed loading the users gists. Sorry for that!</>
          default:
            return <>{`WTF is that state: ${status}? Don't know what to render, dude!`}</>
        }
      })()}
    </>
  )
}

function Gists({ gists }: { gists: Gist_API[] }) {
  function renderGist(gist: Gist_API) {
    return <Gist gist={gist} key={gist.id} />
  }

  return <ul>{gists.map(renderGist)}</ul>
}

function Gist({ gist }: { gist: Gist_API }) {
  return (
    <div>
      <Link to={`/${gist.owner.login}/${gist.id}`}>{gist.description}</Link>
    </div>
  )
}
