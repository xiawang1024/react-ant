import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { ActivityIndicator, Flex, WhiteSpace } from 'antd-mobile'

const Home = lazy(() => import('../containers/Home'))
const SignIn = lazy(() => import('../containers/SignIn'))
const SignUp = lazy(() => import('../containers/SignUp'))
const Detail = lazy(() => import('../containers/Detail'))
const NotFound = lazy(() => import('../containers/NotFound'))

const PrivateRoute = ({ component: Component, authToken, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signIn',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

class Router extends Component {
  render() {
    let { authToken } = this.props.signIn
    console.log('render')
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
            <Route exact path='/' component={Home} />
            <Route path='/signIn' component={SignIn} />
            <Route path='/signUp' component={SignUp} />
            <PrivateRoute path='/home' authToken={authToken} component={Home} />
            <PrivateRoute
              path='/detail'
              authToken={authToken}
              component={Detail}
            />
            <Route path='*' component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signIn: state.signIn
  }
}

export default connect(mapStateToProps)(Router)
