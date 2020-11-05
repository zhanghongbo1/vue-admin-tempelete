import request from '@/utils/request'
/**
 * 
 * @param {*添加type} data 
 */
export function addTypes(data) {
  return request({
    url: '/add/type',
    method: 'post',
    data
  })
}

/**
 * @param
 * @param {*获取所有类型} data 
 */
export function getTypes(data) {
  return request({
    url: '/getAllTypes',
    method: 'post',
    data
  })
}

/**
 * 
 * @param {*获取七牛云token} data 
 */
export function getTokens(data) {
  return request({
    url: '/getUploadTken',
    method: 'post',
    data
  })
}

/**
 * 
 * @param {*添加书本} data 
 */
export function bookAdd(data) {
  return request({
    url: '/books/add',
    method: 'post',
    data
  })
}