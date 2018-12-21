/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { NavBar, Icon, List, Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './index.css'

const Item = List.Item
const Brief = Item.Brief

const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122'
  }
]

class Detail extends Component {
  componentDidMount = () => {}
  toHomeHandler = () => {
    // this.props.history.push('/home', { selectedTab: 'selectedTwo' })
    this.props.history.push({
      pathname: '/home',
      state: { selectedTab: 'selectedTwo' }
    })
  }

  render() {
    let { recordInfo } = this.props.reCord
    return (
      <div style={{ paddingBottom: '80px' }}>
        <NavBar
          mode='light'
          icon={<Icon type='left' />}
          onLeftClick={this.toHomeHandler}
        >
          我的报料
        </NavBar>
        <List renderHeader={() => '报料内容'}>
          <Item multipleLine>
            主题 <Brief>{recordInfo.title}</Brief>
          </Item>
          <Item multipleLine>
            具体内容 <Brief>{recordInfo.content}</Brief>
          </Item>

          {data.length > 0 ? (
            <Item>
              <Flex>
                {data.map((item, index) => (
                  <Flex.Item key={index}>
                    <img className='imgView' src={item.url} />
                  </Flex.Item>
                ))}
              </Flex>
            </Item>
          ) : (
            <Item>
              图片 <Brief>未上传图片</Brief>
            </Item>
          )}
        </List>
        <List renderHeader={() => '日期/区域'}>
          <Item extra={'2018-12-06'}>{recordInfo.createTime}</Item>
          <Item extra={'郑州市二七区'}>{recordInfo.area}</Item>
        </List>
        <List renderHeader={() => '联系人'}>
          <Item extra={'联系人'}>{recordInfo.name}</Item>
          <Item extra={'13812341234'}>{recordInfo.mobile}</Item>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reCord: state.reCord
  }
}

export default withRouter(connect(mapStateToProps)(Detail))
