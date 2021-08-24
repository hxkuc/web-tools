/**
 * 服务提供
 */

import { isElectron } from './utils'

export async function addQuestion (data) {
  console.log('server', data)
  if (isElectron()) {
    return window.electronBridge.addQuestion(data)
  } else {
    // 浏览器执行
    console.log(666)
    return Promise.resolve()
  }
}

export async function getQuestionList (filters) {
  if (isElectron()) {
    return window.electronBridge.getQuestionList(filters)
  } else {
    // 浏览器执行
    console.log(666)
  }
}