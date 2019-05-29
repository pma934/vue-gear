<template>
  <!-- stripe斑马 ，border边框  -->
  <!-- row-class-name为某一行添加class -->
  <!-- 定义height属性，即可实现固定表头的表格  max-height 也行-->
  <!-- fixed固定列，掩模可能会超出 -->
  <!-- 单选！！！！！！  高亮样式 highlight-current-row -->
  <div style="border:1px solid;">
    <el-date-picker v-model="scopedate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
    <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="filterDate.length">
    </el-pagination>
    <!-- 过滤 + 分页 的情况下正确删除 -->
    <el-table ref="zxzTable" :data="showData" height="''" style="height:calc(400px)" border :row-class-name="'row-class-zxz'"
      highlight-current-row @current-change="handleCurrentChange">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="tag" label="tag" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click.stop="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click.stop="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="half">
      <label>搜索：</label>
      <el-input type="text" v-model="search"></el-input>
      <h2>
        <el-input type="text" v-model="currentRow.date"></el-input>
      </h2>
      <h2>
        <el-input type="text" v-model="currentRow.name"></el-input>
      </h2>
      <h2>
        <el-input type="text" v-model="currentRow.address"></el-input>
      </h2>
      <h2>
        <el-input type="text" v-model="currentRow.tag"></el-input>
      </h2>
      <el-button size="mini" type="danger" @click.stop="handleDelete(currentRow)">删除</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: "",
        tableData: [],
        currentRow: "",
        currentSize: 10,
        currentPage: 1,
        scopedate: ""
      }
    },
    computed: {
      filterDate() {
        let filterDate = this.tableData;
        if (this.scopedate[0]) { //日期过滤
          filterDate = filterDate.filter(data => (new Date(data.date) > this.scopedate[0]) && (new Date(data.date) <
            this.scopedate[1]))
        }
        filterDate = filterDate.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()) ||
          data.address.toLowerCase().includes(this.search.toLowerCase())) //名字过滤
        return filterDate
      },
      showData() {
        return this.filterDate.slice(this.currentSize * (this.currentPage - 1), this.currentSize * this.currentPage)
      }
    },
    methods: {
      handleSizeChange(val) { //切换每页条数
        this.currentSize = val
      },
      handlePageChange(val) { //切换页数,切换页面会重新渲染，会设置选中
        this.currentPage = val
        // this.$refs.zxzTable.setCurrentRow(this.currentRow);
      },
      handleCurrentChange(currentRow) { //只有点击了行，currentRow才会改变；即切换页面，选中不会掉
        if (currentRow) {
          this.currentRow = currentRow;
        }
      },
      handleEdit(scope) {
        console.log(scope.row.date);
      },
      handleDelete(row) {
        for (var i = 0; i < this.tableData.length; i++) { //遍历原table删除行,可能还会发送http更新
          if (this.tableData[i] == row) {
            this.tableData.splice(i, 1)
          };
        }
        if (row == this.currentRow) { //删除行是选中行时，清除选中行
          this.currentRow = {}
        }
        // this.$refs.zxzTable.setCurrentRow(this.currentRow); //万一选中了下一页第一个呢             绑定到update里啊
      },
    },
    created() {
      for (let i = 0; i < 100; i++) {
        this.tableData[i] = {
          date: this.$Mock.Random.datetime(),
          name: this.$Mock.Random.cname(),
          address: this.$Mock.Random.county(true),
          tag: this.$Mock.mock({
            "string|1-3": "★"
          }).string
        }
      }
    },
    mounted() {
      console.log(this.Global.a++)
      console.log(this.$Mock.Random.datetime('y-MM-dd HH:mm:ss'))
    },
    updated() {
      this.$refs.zxzTable.setCurrentRow(this.currentRow);
    }
  }
</script>

<style>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }
</style>