/**
 * home页面
 */

import { useEffect, useState } from 'react'
import { Modal, Form,Input } from 'antd';
import { addQuestion, getQuestionList } from './server'

export function HomeBody() {
  const [addModal, setAddModal] = useState(false)
  const [questionList, setQuestionList] = useState([])


  useEffect(() => {
    console.log('useEffect')
    getData()
  }, [])


  function getData() {
    getQuestionList().then(res => {
      console.log('res', res)
      setQuestionList(res)
    })
  }

  function submitQuestion (data) {
    addQuestion(data).then(res => {
      setAddModal(false)
      getData()
    }).catch(err => {
      console.log(err)
    })
  }

  function showAddModules () {
    setAddModal(true)
  }

  function onCancel () {
    setAddModal(false)
  }

  return (
    <div className="body">
      <div className="add"> <button className="add-button" onClick={showAddModules}>新增</button></div>
      <AddModal isModalVisible={addModal} onOk={submitQuestion} onCancel={onCancel}></AddModal>
      <div>{questionList && questionList.map(item => {
        console.log(item)
        return item ? (<div>问题：{item.question} 答案: {item.answer}</div>) : ''
      })}</div>
    </div>
  );
}

export function HomeHeader () {
  return (
    <div className="title">前端知识总结</div>
  )
}

function AddModal (props) {
  console.log('props', props)
  const { isModalVisible, onOk, onCancel } = props
  const { TextArea } = Input;
  const [form] = Form.useForm();

  function submitForm () {
    form.validateFields()
    .then(data => {
      onOk(data)
      form.resetFields();
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Modal title="add question" visible={isModalVisible} onOk={submitForm} onCancel={onCancel}>
      <Form
      form={form}
      name="addQuestion"
    >
      <Form.Item
        label="question"
        name="question"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="answer"
        name="answer"
      >
        <TextArea rows={4} />
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

