import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { UsersGistsPage } from './UsersGistsPage'
import { RouteChildrenProps } from 'react-router'
import GistPage from './GistPage'
import UserSearchPage from './UserSearchPage'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          {slash}
        </Route>
        <Route path="/:username" exact={true}>
          {slashUsername}
        </Route>
        <Route path="/:username/:gistId" exact={true}>
          {slashUsernameSlashGistId}
        </Route>
      </Switch>
    </Router>
  )
}

function slash() {
  return <UserSearchPage />
}

function slashUsername({ match }: RouteChildrenProps<{ username: string }>) {
  if (match && match.params.username) {
    return <UsersGistsPage username={match.params.username} />
  } else {
    return 'That username from the URL is apperently not in the march.params object :('
  }
}

function slashUsernameSlashGistId({ match }: RouteChildrenProps<{ username: string; gistId: string }>) {
  if (match && match.params.username && match.params.gistId) {
    return <GistPage username={match.params.username} gistId={match.params.gistId} />
  } else {
    return 'That username + gistId from the URL are apperently not in the march.params object :('
  }
}
