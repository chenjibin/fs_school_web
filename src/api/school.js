import service from '@/utils/request'

// @Summary 机构列表
// @Produce  application/json
// @Param data body
// @Router /school/list [post]
export function getSchoolList(data) {
  return service({
    url: '/school/list',
    method: 'post',
    data: data
  })
}

// @Summary 创建机构
// @Produce  application/json
// @Param data body
// @Router /school/create [post]
export function createSchool(data) {
  return service({
    url: '/school/create',
    method: 'post',
    data: data
  })
}

// @Summary 更新机构
// @Produce  application/json
// @Param data body
// @Router /school/update [put]
export function updateSchool(data) {
  return service({
    url: '/school/update',
    method: 'put',
    data: data
  })
}

// @Summary 删除机构
// @Produce  application/json
// @Param data body
// @Router /school/delete [delete]
export function deleteSchool(data) {
  return service({
    url: '/school/delete',
    method: 'delete',
    data: data
  })
}
