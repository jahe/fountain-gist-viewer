import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RouteChildrenProps } from 'react-router'
import UserSearchScene from './scenes/UsersSearch/UserSearchScene'
import { UsersGistsScene } from './scenes/UsersGists/UsersGistsScene'
import GistScene from './scenes/Gist/GistScene'

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
  return <UserSearchScene />
}

function slashUsername({ match }: RouteChildrenProps<{ username: string }>) {
  if (match && match.params.username) {
    return <UsersGistsScene username={match.params.username} />
  } else {
    return 'That username from the URL is apperently not in the march.params object :('
  }
}

function slashUsernameSlashGistId({ match }: RouteChildrenProps<{ username: string; gistId: string }>) {
  if (match && match.params.username && match.params.gistId) {
    return <GistScene username={match.params.username} gistId={match.params.gistId} />
  } else {
    return 'That username + gistId from the URL are apperently not in the march.params object :('
  }
}
