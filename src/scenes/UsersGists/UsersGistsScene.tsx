/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Gist_API, LoadingStatus } from '../../types'
import { fetchUsersGists } from '../../api'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { shadesOfBlue } from '../../colors'

const CancelToken = axios.CancelToken

export function UsersGistsScene({ username }: { username: string }) {
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input.current) {
      input.current!.focus()
    }
  }, [])

  const [gists, setGists] = useState<Gist_API[]>()
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(LoadingStatus.Loading)
  const [searchTerm, setSearchTerm] = useState('')

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

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  const filteredGists = useMemo(() => {
    if (!gists || !gists.length) {
      return []
    }
    return gists.filter(gist => gist.description.toLowerCase().includes(searchTerm.toLowerCase().trim()))
  }, [searchTerm, gists])

  return (
    <Fragment>
      <h1>{usernameLowerCase}</h1>
      {(status === LoadingStatus.Loading || status == LoadingStatus.SuccessfullyLoaded) && (
        <input
          ref={input}
          onChange={handleSearchChange}
          placeholder="Search..."
          type="text"
          name="gist-search-term"
          css={{
            appearance: 'none',
            marginTop: 5,
            height: 54,
            borderRadius: 3,
            padding: '5px 20px',
            fontSize: 20,
            fontWeight: 500,
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.17)',
            color: shadesOfBlue[3],
            display: 'block',
            width: '100%'
          }}
        />
      )}
      {(() => {
        switch (status) {
          case LoadingStatus.Loading:
            return <Fragment>Wait a sec! Loading users gists...</Fragment>
          case LoadingStatus.SuccessfullyLoaded:
            return filteredGists && filteredGists.length ? (
              <Gists gists={filteredGists} />
            ) : (
              <Fragment>No Gists found.</Fragment>
            )
          case LoadingStatus.FailedLoading:
            return <Fragment>Failed loading the users gists. Sorry for that!</Fragment>
          default:
            return <Fragment>{`WTF is that state: ${status}? Don't know what to render, dude!`}</Fragment>
        }
      })()}
    </Fragment>
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
