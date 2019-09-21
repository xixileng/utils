<template>
  <div style="width:500px">
    <el-table :data="data" @mouseenter.native="roll.pause" @mouseleave.native="roll.play">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Roll from './Roll'
// 不局限 Vue 和 Element，适用于多数 MVVM 结构的库

export default {
  data () {
    return {
      data: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区'
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
        address: '上海市普陀区金沙江路 1516 弄 上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.roll = new Roll()
  },
  mounted () {
    this.roll.setEl(this.$el)
    this.roll.setData(this.data)

    setInterval(() => {
      this.data = [{
        date: '2016-05-02',
        name: '王大虎',
        address: '广州市普陀区金沙江路 1520 弄'
      }, {
        date: '2016-05-04',
        name: '大王虎',
        address: '天津市普陀区金沙江路 1522 弄'
      }, {
        date: '2016-05-01',
        name: '虎大王',
        address: '深圳市普陀区'
      }, {
        date: '2016-05-03',
        name: '王虎大',
        address: '北京市普陀区金沙江路 1528 弄 北京市普陀区金沙江路 1528 弄'
      }]
      this.roll.setData(this.data)
    }, 15000)
  },
  beforeDestroy () {
    this.roll.dispose()
  }
}
</script>
