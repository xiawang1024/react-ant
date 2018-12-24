/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { NavBar, Icon, List, Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import WxImageViewer from 'react-wx-images-viewer'

import './index.css'

const Item = List.Item
const Brief = Item.Brief

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isViewPic: false
    }
  }
  componentDidMount = () => {}
  toHomeHandler = () => {
    // this.props.history.push('/home', { selectedTab: 'selectedTwo' })
    this.props.history.push({
      pathname: '/home',
      state: { selectedTab: 'selectedTwo' }
    })
  }
  openView = index => {
    this.setState({
      index,
      isViewPic: true
    })
  }
  onClose = () => {
    this.setState({
      isViewPic: false
    })
  }
  render() {
    let { index, isViewPic } = this.state
    let { recordInfo } = this.props.reCord
    let imgList = JSON.parse(recordInfo.attachments)
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
            内容 <Brief>{recordInfo.content}</Brief>
          </Item>

          {imgList.length > 0 ? (
            <Item>
              <Flex>
                {imgList.map((item, index) => (
                  <Flex.Item key={index}>
                    <img
                      className='imgView'
                      src={item}
                      onClick={this.openView.bind(this, index)}
                    />
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
          <Item extra={'时间'}>{recordInfo.createTime}</Item>
          <Item extra={'区域'}>{recordInfo.area}</Item>
        </List>
        <List renderHeader={() => '联系人'}>
          <Item extra={'联系人'}>{recordInfo.name}</Item>
          <Item extra={'联系电话'}>{recordInfo.mobile}</Item>
        </List>
        {isViewPic ? (
          <WxImageViewer onClose={this.onClose} urls={imgList} index={index} />
        ) : (
          ''
        )}
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

