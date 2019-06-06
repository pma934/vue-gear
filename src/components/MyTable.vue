<template>
  <div v-if="tableData.length">
    <table class="my-table" cellspacing="0">
      <colgroup>
        <col v-for="n in head.length" :key="n" :width="100/head.length + '%'">
      </colgroup>
      <thead class="my-thead">
        <tr class="my-tr">
          <th v-for="h in head" :key="h" class="my-th">
            <div>{{h}}</div>
          </th>
        </tr>
      </thead>
      <tbody class="my-tbody">
        <tr v-for="(tr,i) in tableData" :key="i" class="my-tr">
          <td v-for="(h,j) in head" :key="j" v-show="tr[h]" :rowspan="rowspan[i][j]" class="my-td">
            <div>{{tr[h]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MyTable",
  props: {
    tableData: Array
  },
  data() {
    return {
      head: [],
      rowspan: []
    };
  },
  watch:{
    tableData:function(){
      this.getTable(this.tableData);
    }
  },
  methods: {
    getTable(data) {
      this.head = Object.keys(data[0]);
      this.rowspan = Array(data.length).fill(1);
      this.rowspan = this.rowspan.map(() => Array(this.head.length).fill(1));
      for (let i = this.rowspan.length - 1; i >= 0; i--) {
        for (let j in this.head) {
          if (!data[i].hasOwnProperty(this.head[j])) {
            this.rowspan[i - 1][j] += this.rowspan[i][j];
            this.rowspan[i][j] = 1;
          }
        }
      }
    }
  },
};
</script>

<style scoped>
.my-table {
  width: 100%;
}
.my-thead,
.my-tbody {
  width: inherit;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  color: #515a6e;
  font-size: 12px;
  background-color: #fff;
  box-sizing: border-box;
}
.my-td:first-child,
.my-th:first-child {
  border-left: 1px solid #e8eaec;
}
.my-td,
.my-th {
  min-width: 0;
  height: 48px;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-bottom: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  background-color: #fff;
}
.my-th {
  border-top: 1px solid #e8eaec;
  background-color: #f8f8f9;
}
.my-table div {
  padding-left: 18px;
  padding-right: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
}
</style>