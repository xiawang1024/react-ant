/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './index.css'
import { TabBar } from 'antd-mobile'

import Form from '../Form'
import ListView from '../../components/List'

class TabBarExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'greenTab',
      hidden: false,
      fullScreen: false
    }
  }

  renderContent(pageText) {
    return pageText === 'Friend' ? <Form /> : <ListView />
  }

  render() {
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
            key='Friend'
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab'
              })
            }}
          >
            {this.renderContent('Friend')}
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
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab'
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

export default TabBarExample
