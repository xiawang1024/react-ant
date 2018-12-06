import React from 'react'
import { ListView } from 'antd-mobile'
import ReactDOM from 'react-dom'
import axios from 'axios'

class ListViewExample extends React.Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4
    }
  }

  componentDidMount() {
    let hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop -
      50

    axios.get('http://rap2api.taobao.org/app/mock/1942/rndemo').then(res => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data.list),
        isLoading: false,
        height: hei
      })
    })
    setTimeout(() => {}, 600)
  }

  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState({
        // dataSource: this.state.dataSource.cloneWithRows(
        //   dataBlobs,

        // ),
        isLoading: false
      })
    }, 1000)
  }

  render() {
    const row = (rowData, sectionID, rowID, highlightRow) => {
      console.log(rowData, rowID)

      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6'
            }}
          >
            {rowData.name}
          </div>
          <div
            style={{ display: 'flex', padding: '15px 0' }}
            onClick={() => {
              alert(rowID)
            }}
          >
            <img
              style={{ height: '64px', marginRight: '15px' }}
              src='{obj.img}'
              alt=''
            />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>des</div>
              <div>
                <span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥{' '}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>历史报料</span>}
        renderFooter={() => (
          <div style={{ padding: 20, textAlign: 'center' }}>
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
        onEndReachedThreshold={10}
      />
    )
  }
}

export default ListViewExample
