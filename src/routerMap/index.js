import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ActivityIndicator, Flex, WhiteSpace } from 'antd-mobile'

const Home = lazy(() => import('../containers/Home'))
const SignIn = lazy(() => import('../containers/SignIn'))
const SignUp = lazy(() => import('../containers/SignUp'))
const NotFound = lazy(() => import('../containers/NotFound'))

class Router extends Component {
  render() {
    return (
      <div>
        <Suspense
          fallback={
            <Flex justify='center' direction='column'>
              <WhiteSpace size='xl' />
              <ActivityIndicator text='Loading...' size='large' />
            </Flex>
          }
        >
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path='/signIn' component={SignIn} />
            <Route path='/signUp' component={SignUp} />
            <Route path='/home' component={Home} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    )
  }
}

export default Router
