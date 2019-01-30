import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchPostForm, fetchUploadImage, fetchUserInfo } from '../../api'
import { titleTypeList } from './data.js'

import {
  Picker,
  Button,
  WhiteSpace,
  WingBlank,
  Toast,
  InputItem,
  TextareaItem,
  ImagePicker,
  DatePicker,
  Modal,
  Icon,
  List
} from 'antd-mobile'

import { createForm } from 'rc-form'
import dayjs from 'dayjs'

const operation = Modal.operation

class FormList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      sex: '先生',
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
        Toast.info('请填写联系电话', 2)
      }
      // console.log(error)
      // this.setState({
      //   submitLoading: true
      // })
      // this.postData(value)
    })
  }
  postData = (data) => {
    data.date = dayjs(data.date).format('YYYY-MM-DD')

    let postData = {
      title: data.title && data.title[0],
      content: data.detail,
      area: data.address,
      occurTime: data.date,
      attachments: JSON.stringify(this.state.attachments),
      name: data.contact,
      sex: this.state.sex,
      mobile: data.tel && data.tel.split(' ').join('')
    }
    console.log(postData)
    fetchPostForm(postData).then((res) => {
      let { status } = res.data
      if (status === 'ok') {
        this.setState({
          submitLoading: false
        })
        Toast.success('提交成功', 1, () => {
          Toast.info('通过手机号可以查询进度和历史爆料信息，请设置账户密码。', 3, () => {
            this.resetForm()
            // this.props.history.push('/signIn')
          })
        })
      } else {
        Toast.fail('提交失败', 1, () => {
          this.setState({
            submitLoading: false
          })
        })
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
      fetchUploadImage(formData).then((res) => {
        let { msg, data } = res.data
        if (msg === 'ok') {
          this.setState({
            attachments: [ ...attachments, data ]
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
  sexSelectHandler = () => {
    operation([
      {
        text: '先生',
        onPress: () =>
          this.setState({
            sex: '先生'
          })
      },
      {
        text: '女士',
        onPress: () =>
          this.setState({
            sex: '女士'
          })
      }
    ])
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form
    const { files } = this.state
    let { userInfo } = this.props.signIn
    return (
      <form className='FormList' style={{ paddingBottom: '80px' }}>
        <WhiteSpace />

        <List>
          <Picker data={titleTypeList} cols={1} {...getFieldProps('title')} extra='请选择新闻类型'>
            <List.Item arrow='horizontal'>新闻类型</List.Item>
          </Picker>
          <TextareaItem name='detail' clear {...getFieldProps('detail')} placeholder='请输入线索具体内容' rows={5} />

          <List.Item>
            上传图片
            <ImagePicker
              files={files}
              onChange={this.onFileChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 4}
            />
          </List.Item>

          <WhiteSpace size='sm' />
          <InputItem
            name='address'
            clear
            {...getFieldProps('address')}
            placeholder='请填写区域信息'
            ref={(el) => (this.areaLabel = el)}
          >
            <div onClick={() => this.areaLabel.focus()}>区域</div>
          </InputItem>

          <InputItem
            name='contact'
            clear
            {...getFieldProps('contact')}
            placeholder='请填写联系人'
            extra={<SexSelect sex={this.state.sex} />}
            onExtraClick={this.sexSelectHandler}
            ref={(el) => (this.contactLabel = el)}
          >
            <div onClick={() => this.contactLabel.focus()}>联系人</div>
          </InputItem>

          <InputItem
            name='tel'
            type='phone'
            clear
            error={getFieldError('tel') ? true : false}
            onChange={this.onIptChange}
            {...getFieldProps('tel', {
              initialValue: userInfo.mobile,
              rules: [ { required: true } ]
            })}
            placeholder='请填写联系电话'
            ref={(el) => (this.telLabel = el)}
          >
            <div onClick={() => this.telLabel.focus()}>联系电话</div>
          </InputItem>
        </List>

        <WhiteSpace size='xl' />
        <WingBlank>
          <Button type='primary' loading={this.state.submitLoading} onClick={this.submit}>
            提交
          </Button>
        </WingBlank>
      </form>
    )
  }
}

function SexSelect(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
      <span>{props.sex}</span>
      <Icon type='right' size='xs' />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    signIn: state.signIn
  }
}

export default withRouter(connect(mapStateToProps)(createForm()(FormList)))
