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
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleCreate">新增项目</el-button>
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
        <el-table-column fixed="right" align="operation" label="操作" width="100px">
            <template slot-scope="{row,$index}">
                <el-button type="text" size="mini"  @click="handleUpdate(row)">编辑</el-button>
                <el-button type="text" size="mini" @click="handleDelete(row,$index)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="部门名称" prop="department">
          <el-select v-model="temp.department" class="filter-item" placeholder="Please select">
            <el-option v-for="item in list" :key="item.id" :label="item.department" :value="item.department" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="project">
          <el-input v-model="temp.project" />
        </el-form-item>
        <el-form-item label="所属端" prop="terminal">
          <el-input v-model="temp.terminal" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    </div>
  </template>

<script>
import { getprojectList, createProject, updateProject, deleteProject } from '@/api/project'

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
      temp: {
        id: undefined,
        remark: '',
        updateTime: new Date(),
        project: '',
        department: '',
        terminal: '',
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        department: [{ required: true, message: 'departmentname is required', trigger: 'change' }],
        projectn: [{ required: true, message: 'projectname is required', trigger: 'blur' }],
        terminal: [{ required: true, message: 'terminal is required', trigger: 'blur' }]
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
        console.log(this.list)
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
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        updateTime: new Date(),
        project: '',
        department: '',
        terminal: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createProject(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.updateTime = new Date(this.temp.updateTime)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updateTime = +new Date() // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateProject(tempData).then(() => {
            const index = this.list.findIndex(v => v.department === this.temp.department)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            console.log(update)
            console.log(this.list)
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定要删除该项目下的用户吗?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                deleteProject(index)
                this.list.splice(index, 1)
                
                this.$message.success("删除成功");
                // this.fetchData();
             
            })
            .catch(() => {
                this.$message.success("取消成功");
            })

    }
  }
}
</script>

<style scoped>

</style>