<template>
  <div>
    <!-- 简单使用 -->
    <Popconfirm @confirm="handleConfirm">
      <el-button>复制</el-button>
    </Popconfirm>

    <!-- 多配置 -->
    <Popconfirm
      placement="top"
      width="220"
      type="danger"
      okType="danger"
      okText="删除"
      title="将会删除该条目下所有数据，确定要删除吗？"
      icon="el-icon-error"
      :check="checkDelete"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <el-button icon="el-icon-delete" type="danger" size="mini">删除</el-button>
    </Popconfirm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  methods: {
    checkDelete () {
      if (this.data.length === 0) return false
    },
    handleConfirm () {
      console.log('confirm')
    },
    handleCancel () {
      console.log('cancel')
    }
  }
}
</script>