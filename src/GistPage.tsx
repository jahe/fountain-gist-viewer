import React, { useEffect, useState } from 'react'
import { LoadingStatus, Gist_API, GistFile_API } from './types'
import { fetchGist } from './api'
import axios from 'axios'

const CancelToken = axios.CancelToken

export default function GistPage({ username, gistId }: { username: string; gistId: string }) {
  const [gist, setGist] = useState<Gist_API>()
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(LoadingStatus.Loading)

  useEffect(() => {
    let didCancel = false
    document.title = `${username}'s gist`

    const cancelTokenSource = CancelToken.source()
    ;(async () => {
      try {
        const fetchedGist = await fetchGist(gistId, cancelTokenSource.token)
        if (!fetchedGist || didCancel) {
          return
        }
        document.title = `${fetchedGist.description} - ${username}'s gist`
        setStatus(LoadingStatus.SuccessfullyLoaded)
        setGist(fetchedGist)
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
  }, [username, gistId])

  switch (status) {
    case LoadingStatus.Loading:
      return <>'Wait a sec! Loading users gists...'</>
    case LoadingStatus.SuccessfullyLoaded:
      return gist ? <Gist gist={gist} /> : <>'Gist not found.'</>
    case LoadingStatus.FailedLoading:
      return <>'Failed loading the users gists. Sorry for that!'</>
    default:
      return <>`WTF is that state: ${status}? Don't know what to render, dude!`</>
  }
}

function Gist({ gist }: { gist: Gist_API }) {
  return (
    <>
      <h1>{gist.description}</h1>
      {Object.values(gist.files).map(gistFile => (
        <GistFile gistFile={gistFile} key={gistFile.filename} />
      ))}
    </>
  )
}

function GistFile({ gistFile }: { gistFile: GistFile_API }) {
  return (
    <>
      <h2>{gistFile.filename}</h2>
      <pre>{gistFile.content}</pre>
    </>
  )
}
