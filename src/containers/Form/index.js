import React, { Component } from 'react'

import FormList from '../../components/Form'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <FormList />
      </div>
    )
  }
}

export default Form
