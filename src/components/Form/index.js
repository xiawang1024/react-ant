import React, { Component } from 'react'

import {
  Button,
  WhiteSpace,
  WingBlank,
  Carousel,
  InputItem,
  TextareaItem,
  ImagePicker,
  DatePicker,
  List,
  Picker
} from 'antd-mobile'

import { createForm } from 'rc-form'

const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122'
  }
]
class FormList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},
      files: data
    }
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      this.setState({
        formData: value
      })
      if (!error) {
        console.log(value)
      }
    })
  }
  onFileChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files
    })
  }
  onIptChange = value => {
    alert(11)
  }
  render() {
    const { getFieldProps, getFieldsValue, getFieldError } = this.props.form
    const { files, formData } = this.state
    return (
      <div className='FormList'>
        <WhiteSpace />

        <InputItem
          name='title'
          error={getFieldError('title') ? true : false}
          {...getFieldProps('title', { rules: [{ required: true }] })}
          placeholder='请输入线索主题'
          ref={el => (this.themeLabel = el)}
        >
          <div onClick={() => this.themeLabel.focus()}>主题</div>
        </InputItem>
        <TextareaItem
          name='detail'
          error={getFieldError('detail') ? true : false}
          {...getFieldProps('detail', { rules: [{ required: true }] })}
          placeholder='请输入线索具体内容，点击+可以上传图片'
          rows={5}
          count={100}
        />
        <ImagePicker
          files={files}
          onChange={this.onFileChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 4}
        />

        <DatePicker
          mode='date'
          title='选择日期'
          format={`YYYY-MM-DD`}
          {...getFieldProps('date', {
            initialValue: new Date(),
            rules: [{ required: true }]
          })}
        >
          <List.Item arrow='horizontal'>日期</List.Item>
        </DatePicker>
        <WhiteSpace size='sm' />
        <InputItem
          name='address'
          error={getFieldError('address') ? true : false}
          {...getFieldProps('address', { rules: [{ required: true }] })}
          placeholder='请填写区域信息'
          ref={el => (this.areaLabel = el)}
        >
          <div onClick={() => this.areaLabel.focus()}>区域</div>
        </InputItem>
        <WhiteSpace size='lg' />
        <InputItem
          name='contact'
          error={getFieldError('contact') ? true : false}
          {...getFieldProps('contact', { rules: [{ required: true }] })}
          placeholder='请填写联系人'
          ref={el => (this.contactLabel = el)}
        >
          <div onClick={() => this.contactLabel.focus()}>联系人</div>
        </InputItem>
        <InputItem
          name='tel'
          onChange={this.onIptChange}
          error={getFieldError('tel') ? true : false}
          {...getFieldProps('tel', { rules: [{ required: true }] })}
          placeholder='请填写联系电话'
          ref={el => (this.telLabel = el)}
        >
          <div onClick={() => this.telLabel.focus()}>联系电话</div>
        </InputItem>

        <WhiteSpace size='xl' />
        <WingBlank>
          <Button type='primary' loading onClick={this.submit}>
            提交
          </Button>
        </WingBlank>
        {console.log(new Date(getFieldsValue().date).getTime())}
        <WhiteSpace size='xl' />
      </div>
    )
  }
}

export default createForm()(FormList)
