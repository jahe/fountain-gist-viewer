/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FormEvent, useEffect, useRef } from 'react'

import { RouteComponentProps, withRouter } from 'react-router'
import { darkBlueGrey, shadesOfBlue } from '../../colors'

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
    <article
      css={{
        margin: 20
      }}
    >
      <h1
        css={{
          textAlign: 'center',
          color: darkBlueGrey
        }}
      >
        ⛲️ Fountain - A GitHub Gist Viewer
      </h1>
      <form
        onSubmit={handleSubmit}
        css={{
          maxWidth: 400,
          marginTop: 40,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <label css={{ marginBottom: 10, textAlign: 'center' }}>
          <span
            css={{
              fontWeight: 500,
              color: '#aaa',
              marginBottom: 5
            }}
          >
            GitHub username
          </span>
          <input
            ref={input}
            type="text"
            name="username"
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
        </label>
        <button
          css={{
            marginTop: 25,
            height: 54,
            width: '100%',
            fontSize: 20,
            fontWeight: 500,
            padding: 5,
            borderRadius: 3,
            backgroundColor: shadesOfBlue[0],
            border: 'none',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Go
        </button>
      </form>
    </article>
  )
}

export default withRouter(UserSearchScene)
