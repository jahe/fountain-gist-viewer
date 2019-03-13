import React, { FormEvent, useEffect, useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

function UserSearchPage({ history }: RouteComponentProps) {
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
    <>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub username:
          <input ref={input} type="text" name="username" />
        </label>
        <button>Go</button>
      </form>
    </>
  )
}

export default withRouter(UserSearchPage)
