/**
 * 请求表格数据
 */
const service = 'service'

export function getTableData (params) {
  return service.request({
    method: params.method || 'post',
    url: params.url,
    data: params.data || {}
  })
}
