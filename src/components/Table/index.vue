<template>
  <div >
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <!-- 多选框 -->
      <el-table-column
        v-if="tableConfigData.isShowSelect"
        type="selection"
        width="55">
      </el-table-column>
      <template v-for="item in tableConfigData.tHead">
        <!-- 因为v-if和v-for不能同时使用所有外面用template包裹进行v-for -->
        <!-- v-slot -->
        <el-table-column
          v-if="item.columnType === 'slot'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
          <template v-slot="{ row }">
            <slot :name="item.slotName" :row="row"></slot>
          </template>
        </el-table-column>
        <!-- 文本类表头 -->
        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
      </template>

    </el-table>
    <!-- pagination -->
    <el-pagination
      v-if="tableConfigData.isShowPagination"
      :style="{'margin-top':'20px'}"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 200, 300, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { requestUrl } from '@s/api/requestUrl'
import { getTableData } from '@s/api/common'
export default {
  name: 'TableConfig',
  props: {
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // table
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableConfigData: {
        isShowPagination: false,
        isShowSelect: false,
        tHead: [],
        isRememberPagination: false,
        requestData: {
          url: '',
          method: ''
        }
      },
      // pagination
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created () {
    this.initTableConfig()
  },
  methods: {
    initTableConfig () {
      for (let key in this.tableConfig) {
        // 匹配相同的key,如果key存在,则替换
        if (Object.keys(this.tableConfigData).includes(key)) {
          this.tableConfigData[key] = this.tableConfig[key]
        }
      }
    },
    getTableData () {
      let requestJson = this.tableConfig.requestData
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data
      }
      getTableData(requestData).then(response => {
        let responseData = response.data.data.data
        if (responseData && responseData.length > 0) {
          // 赋值
          this.tableData = responseData
          // 数据统计
          this.total = response.data.data.total
        } else {
          // 赋值
          this.tableData = responseData
        }
      }).catch()
    },

    handleSizeChange (val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.pageSize = 1
      this.getTableData()
    }
  }
}
</script>
<style>

</style>
