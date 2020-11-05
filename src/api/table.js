import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/book/table',
    method: 'post',
    data
  })
}
export function getAllList(data) {
  return request({
    url: '/book/all',
    method: 'post',
    data
  })
}


export function updateTable(data) {
  return request({
    url: '/upOrDown',
    method: 'post',
    data
  })
}
export function seacrchBook(data) {
  return request({
    url: '/seacrch',
    method: 'post',
    data
  })
}

export function getDeail(data) {
  return request({
    url: '/getDeail',
    method: 'post',
    data
  })
}

export function recompose(data) {
  return request({
    url: '/upDateBook',
    method: 'post',
    data
  })
}