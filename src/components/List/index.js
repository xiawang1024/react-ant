import React from 'react'
import { ListView, PullToRefresh, Icon } from 'antd-mobile'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as reCordActions from '../../store/actions/reCord'

import { fetchHotLineList } from '../../api'
import './index.css'
class ListViewExample extends React.Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      currentPage: 1,
      height: (document.documentElement.clientHeight * 3) / 4
    }
    this._data = []
    this.totalPages = null
  }

  componentDidMount() {
    let hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop -
      50

    fetchHotLineList(1).then(res => {
      let { content, totalPages } = res.data
      this.totalPages = totalPages
      this._data = this._data.concat(content)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._data),
        isLoading: false,
        height: hei
      })
    })
    setTimeout(() => {}, 600)
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    this._data = []
    fetchHotLineList(1).then(res => {
      let { content } = res.data
      this._data = this._data.concat(content)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._data),
        isLoading: false,
        refreshing: false,
        currentPage: 1
      })
    })
  }
  onEndReached = event => {
    console.log('reach end', event)
    this.setState({ isLoading: true })
    let { currentPage } = this.state
    currentPage++

    if (currentPage > this.totalPages) {
      this.setState({
        isLoading: false
      })
      return
    } else {
      fetchHotLineList(currentPage).then(res => {
        let { content } = res.data
        this._data = this._data.concat(content)

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._data),
          isLoading: false,
          currentPage
        })
      })
    }
  }

  toDetailHandler = data => {
    let { reCordActions } = this.props
    reCordActions.setCord({
      recordInfo: data
    })
    window.localStorage.setItem('recordInfo', JSON.stringify(data))
    this.props.history.push('/detail')
  }

  render() {
    const row = (rowData, sectionID, rowID, highlightRow) => {
      // console.log(rowData, rowID)

      return (
        <div
          key={rowID}
          style={{
            marginBottom: '15px',
            padding: '0 15px',
            background: '#fff',
            borderRadius: '8px'
          }}
        >
          <div className='title-wx'>{rowData.title}</div>

          <div className='content-wx'>
            <span style={{ color: '#666' }}>{rowData.createTime}</span>
            <Icon
              type='ellipsis'
              onClick={this.toDetailHandler.bind(this, rowData)}
            />
          </div>
        </div>
      )
    }

    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>我的报料</span>}
        renderFooter={() => (
          <div
            style={{
              padding: 20,
              textAlign: 'center'
            }}
          >
            {this.state.isLoading ? '加载中...' : '无更多数据'}
          </div>
        )}
        renderRow={row}
        style={{
          height: this.state.height,
          overflow: 'auto'
        }}
        pageSize={10}
        onScroll={() => {
          console.log('scroll')
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        pullToRefresh={
          <PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        onEndReachedThreshold={500}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    reCord: state.reCord
  }
}

const mapDispatchToProps = dispatch => {
  return { reCordActions: bindActionCreators(reCordActions, dispatch) }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListViewExample)
)
