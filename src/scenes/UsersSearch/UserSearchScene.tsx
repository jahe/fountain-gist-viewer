/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FormEvent, useEffect, useRef, Fragment } from 'react'

import { RouteComponentProps, withRouter } from 'react-router'

function UserSearchScene({ history }: RouteComponentProps) {
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = 'GitHub Gist Viewer'

    if (input.current) {
      input.current!.focus()
    }
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (input.current) {
      history.push(`/${input.current!.value.toLowerCase()}`)
    }
  }

  return (
    <Fragment>
      <h1 css={{ textAlign: 'center' }}>⛲️ Fountain - A GitHub Gist Viewer</h1>
      <form
        onSubmit={handleSubmit}
        css={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 40,
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <label css={{ marginBottom: 10, textAlign: 'center' }}>
          GitHub username
          <input
            ref={input}
            type="text"
            name="username"
            placeholder="..."
            css={{
              marginTop: 5,
              borderRadius: 5,
              padding: 5,
              fontSize: 30,
              border: '1px solid #00d0ff',
              display: 'block',
              width: 300,
              textAlign: 'center'
            }}
          />
        </label>
        <button
          css={{
            width: 300,
            fontSize: 30,
            padding: 5,
            borderRadius: 5,
            backgroundColor: '#00d0ff',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Go
        </button>
      </form>
    </Fragment>
  )
}

export default withRouter(UserSearchScene)
