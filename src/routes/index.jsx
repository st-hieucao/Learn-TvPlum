import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Firebase from '../components/firebase'
import Language from '../components/i18n'

const Routes = () => {
  return (
    <Switch>
      <Route path='/i18n' component={Language} />
      <Route path='/firebase' component={Firebase} />
    </Switch>
  )
}

export default Routes