import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

class Detail extends Component {
  toHomeHandler = () => {
    this.props.history.push('/home', { selectedTab: 'selectedTwo' })
  }
  render() {
    return (
      <div>
        <h1>detail</h1>
        <h3 onClick={this.toHomeHandler}>back</h3>
      </div>
    )
  }
}

export default withRouter(Detail)
