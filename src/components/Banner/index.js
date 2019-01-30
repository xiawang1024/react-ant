import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
class Banner extends Component {
  state = {
    data: [
      {
        id: 1,
        url: 'http://www.hndt.com/brand/612/res/pi3F3ZID.jpg?1497345245233'
      }
    ],
    imgHeight: 140
  }
  componentDidMount() {
    // simulate img loading
    // setTimeout(() => {
    //   this.setState({
    //     data: [
    //       'AiyWuByWklrrUDlFignR',
    //       'TekJlZRVCjLFexlOCuWn',
    //       'IJOtIlfsYdTyaDTRVrLI'
    //     ]
    //   })
    // }, 100)
  }
  render() {
    return (
      <Carousel
        autoplay={false}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={(index) => console.log('slide to', index)}
      >
        {this.state.data.map((item) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={item.id}
            // eslint-disable-next-line no-script-url
            href='javascript:void(0)'
            style={{
              display: 'inline-block',
              width: '100%'
            }}
          >
            <img
              src={item.url}
              alt=''
              style={{ width: '100%', verticalAlign: 'top', height: this.state.imgHeight + 'px' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: '140' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
}

export default Banner
