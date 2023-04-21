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
        <el-table-column align="center" prop="created_at" label="更改时间">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    <!-- 新增项目界面 -->
    <el-dialog title="新增项目" :visible.sync="projectVisible" width="600px" destroy-on-close>
        <el-form label-width="120px" style="padding-right: 30px;" :model="projectForm" label-position="top" :rules="rules" ref="projectForm">
          <el-form-item label="部门名称" prop="projectAdmin">
                <el-select size="small" style="width: 100%" v-model="projectForm.projectAdmin" filterable placeholder="请选择项目管理员">
                    <el-option v-for="item in userList" :key="item.id" :label="item.username" :value="item.id"/>
                </el-select>
          </el-form-item>  
          <el-form-item label="项目名称" prop="name">
                <el-input size="small" style="width: 100%" v-model="projectForm.name" placeholder="请输入项目名称"/>
          </el-form-item>
          <el-form-item label="项目描述" prop="description">
                <el-input size="small" style="width: 100%" :autosize="{ minRows: 4}" type="textarea" clearable placeholder="请输入项目描述" 
                        v-model="projectForm.description" maxlength="200" show-word-limit/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="projectVisible=false">取消</el-button>
            <el-button size="small" type="primary" @click="submitProjectForm('projectForm', projectForm)">确定</el-button>
        </div>
    </el-dialog>
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
      projectVisible: false,
      list: null,
      listLoading: true,
      projectForm: {},
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
        // 新增项目
        addProject(){
            this.projectForm = {};
            this.projectVisible = true;
        },

  }
}
</script>

<style scoped>

</style>