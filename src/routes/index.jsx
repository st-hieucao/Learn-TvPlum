import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Counter from '../components/counter'
import Firebase from '../components/firebase'
import Language from '../components/i18n'

const Routes = () => {
  return (
    <Switch>
      <Route path='/i18n' component={Language} />
      <Route path='/firebase' component={Firebase} />
      <Route path='/click' component={Counter} />
    </Switch>
  )
}

export default Routes