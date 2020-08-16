<template>
  <div class="hello">
    <table-config
      :tableConfig="tableConfig">
      <template v-slot:status="scope">
        {{scope.row.name}}
       <el-switch
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      </template>
      <template v-slot:operate="scope">
        {{scope.row.name}}
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </table-config>
  </div>
</template>

<script>
import TableConfig from './Table'
export default {
  name: 'HelloWorld',
  components: {
    TableConfig
  },
  data () {
    return {
      tableConfig: {
        // 是否显示多选框
        isShowSelect: false,
        // 是否记忆分页
        isRememberPagination: true,
        // url
        requestData: {
          url: 'getTableData',
          method: 'post', // 可以不传,默认是post请求
          data: {
            // 请求入参
            pageNumber: 1,
            pageSize: 10
          }
        },
        // 表头配置
        tHead: [
          {
            prop: 'date',
            label: '日期',
            width: 150
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
          },
          {
            prop: 'status',
            label: '是否开启',
            columnType: 'slot',
            slotName: 'status'
          },
          {
            prop: 'imgUpload',
            label: '图片上传',
            columnType: 'img'
          },
          {
            prop: 'operate',
            label: '操作',
            columnType: 'slot',
            slotName: 'operate'
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
