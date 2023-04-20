/**
 * 公共管理  部门管理
 */
<template>
    <div class="app-container">
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="searchForm">
        <el-form-item label="">
            <el-input size="small" v-model="searchForm.condition" prefix-icon="el-icon-search" placeholder="请输入项目名"/>
        </el-form-item>
        <el-form-item>
            <el-button size="small" type="primary" @click="search">搜索</el-button>
            <el-button size="small" @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item style="float: right">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addProject">新增项目</el-button>
        </el-form-item>
    </el-form>
    <!--列表-->
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="110">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="部门名称"  align="center">
          <template slot-scope="scope">
            {{ scope.row.department }}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.project }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属端" align="center">
          <template slot-scope="scope">
            {{ scope.row.terminal }}
          </template>
        </el-table-column>
        <el-table-column align="更改时间" prop="created_at" label="Display_time">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>

<script>
import { getprojectList } from '@/api/project'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchForm: {
                page: 1,
                limit: 10,
                condition: ""
            },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getprojectList().then(response => {
        console.log(response.data)
        this.list = response.data.items
        this.listLoading = false
      })
    },
        // 搜索按钮
        search() {
            this.fetchData(this.searchForm);
        },
        // 重置按钮
        reset() {
            this.searchForm.condition = "";
            this.fetchData(this.searchForm);
        },
        addProject(){

        }

  }
}
</script>

<style scoped>

</style>