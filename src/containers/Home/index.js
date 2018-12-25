/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as signInActions from '../../store/actions/signIn'
import { TabBar } from 'antd-mobile'

import Form from '../Form'
import ListView from '../../components/List'

import { fetchUserInfo } from '../../api'

class TabBarExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'selectedOne',
      hidden: false,
      fullScreen: false
    }
  }

  componentDidMount() {
    let { signInActions } = this.props
    fetchUserInfo().then(res => {
      let userInfo = res.data
      signInActions.setUserInfo({ userInfo })
    })

    let { selectedTab } =
      !!this.props.location.state && !!this.props.location.state.selectedTab
        ? this.props.location.state
        : {
            selectedTab: 'selectedOne'
          }

    this.setState({
      selectedTab
    })
  }

  renderContent(pageText) {
    return pageText === 'rebe' ? <Form /> : <ListView />
  }

  render() {
    let { selectedTab } = this.state
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor='#949494'
          tintColor='#33A3F4'
          barTintColor='white'
          tabBarPosition='bottom'
        >
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require('./rebe.png')}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require('./rebe-sele.png')}) center center /  21px 21px no-repeat`
                }}
              />
            }
            title='报料'
            key='rebe'
            selected={selectedTab === 'selectedOne'}
            onPress={() => {
              this.setState({
                selectedTab: 'selectedOne'
              })
            }}
          >
            {this.renderContent('rebe')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require('./hist.png')}) center center /  21px 21px no-repeat`
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background: `url(${require('./hist-sele.png')}) center center /  21px 21px no-repeat`
                }}
              />
            }
            title='我的历史'
            key='my'
            selected={selectedTab === 'selectedTwo'}
            onPress={() => {
              this.setState({
                selectedTab: 'selectedTwo'
              })
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { signInActions: bindActionCreators(signInActions, dispatch) }
}

export default connect(mapDispatchToProps)(TabBarExample)
