import React, { Component } from 'react'

import FormList from '../../components/Form'
import Banner from '../../components/Banner'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Banner />
        <FormList />
      </div>
    )
  }
}

export default Form
