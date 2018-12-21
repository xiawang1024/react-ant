import React, { Component } from 'react'
import { fetchPostForm, fetchUploadImage } from '../../api'

import {
  Button,
  WhiteSpace,
  WingBlank,
  Toast,
  InputItem,
  TextareaItem,
  ImagePicker,
  DatePicker,
  List
} from 'antd-mobile'

import { createForm } from 'rc-form'
import dayjs from 'dayjs'

class FormList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      attachments: [],
      submitLoading: false
    }
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          submitLoading: true
        })
        this.postData(value)
      } else {
        Toast.info('请填写完成信息', 2)
      }
    })
  }
  postData = data => {
    data.date = dayjs(data.date).format('YYYY-MM-DD')

    let postData = {
      title: data.title,
      content: data.detail,
      area: data.address,
      occurTime: data.date,
      attachments: JSON.stringify(this.state.attachments),
      name: data.contact,
      mobile: data.tel.split(' ').join('')
    }
    fetchPostForm(postData).then(res => {
      let { status } = res.data
      if (status === 'ok') {
        this.setState({
          submitLoading: false
        })
        Toast.success('提交成功', 2, () => {
          this.resetForm()
        })
      } else {
        Toast.fail('提交失败')
      }
    })
  }
  resetForm = () => {
    const { setFieldsValue } = this.props.form
    let reset = {
      title: '',
      detail: '',
      date: new Date(),
      address: '',
      contact: '',
      tel: ''
    }
    //reset form
    setFieldsValue(reset)
    //reset files
    this.setState({
      files: []
    })
  }
  onFileChange = (files, type, index) => {
    console.log(files, type, index)
    let { attachments } = this.state
    if (type === 'add') {
      let len = files.length
      let file = files[len - 1]
      let formData = new FormData()
      formData.append('file', file.file)
      fetchUploadImage(formData).then(res => {
        let { msg, data } = res.data
        if (msg === 'ok') {
          this.setState({
            attachments: [...attachments, data]
          })
        }
      })
    } else {
      attachments.splice(index, 1)
      this.setState({
        attachments
      })
    }
    this.setState({
      files
    })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { files } = this.state
    return (
      <form className='FormList' style={{ paddingBottom: '80px' }}>
        <WhiteSpace />

        <InputItem
          name='title'
          clear
          error={getFieldError('title') ? true : false}
          {...getFieldProps('title', { rules: [{ required: true }] })}
          placeholder='请输入线索主题'
          ref={el => (this.themeLabel = el)}
        >
          <div onClick={() => this.themeLabel.focus()}>主题</div>
        </InputItem>
        <TextareaItem
          name='detail'
          clear
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
          clear
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
          clear
          error={getFieldError('contact') ? true : false}
          {...getFieldProps('contact', { rules: [{ required: true }] })}
          placeholder='请填写联系人'
          ref={el => (this.contactLabel = el)}
        >
          <div onClick={() => this.contactLabel.focus()}>联系人</div>
        </InputItem>
        <InputItem
          name='tel'
          type='phone'
          clear
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
          <Button
            type='primary'
            loading={this.state.submitLoading}
            onClick={this.submit}
          >
            提交
          </Button>
        </WingBlank>
      </form>
    )
  }
}

export default createForm()(FormList)
