import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

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
  constructor(props) {
    super(props)
    this.state = {
      authToken: true
    }
  }
  componentWillMount() {
    let token = localStorage.getItem('authToken')
    console.log(token)
    this.setState({
      authToken: !!token
    })
  }
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
            <PrivateRoute
              path='/home'
              authToken={this.state.authToken}
              component={Home}
            />
            <PrivateRoute
              path='/detail'
              authToken={this.state.authToken}
              component={Detail}
            />
            <Route path='*' component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    )
  }
}

export default Router
