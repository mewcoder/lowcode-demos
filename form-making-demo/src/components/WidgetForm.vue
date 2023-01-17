<template>
  <el-form
    :label-width="config.labelWidth + 'px'"
    :label-position="config.labelPosition"
    :size="config.size"
  >
    <draggable
      class="list-group"
      tag="ul"
      v-model="widgetList"
      v-bind="{
        animation: 200,
        group: 'people',
        disabled: false,
        ghostClass: 'ghost',
      }"
      @add="onAdd"
    >
      <el-form-item
        v-for="(element, index) in widgetList"
        :key="element.key"
        :label="element.name"
        class="list-form-item"
        @click.native.stop="handleWidgetSelect(element)"
        :style="{
          background:
            selectWidget && selectWidget.key == element.key ? '#ccc' : '',
        }"
      >
        <template v-if="element.type == 'input'">
          <el-input
            :style="{ width: element.options.width }"
            :placeholder="element.options.placeholder"
            v-model="element.options.defaultValue"
          ></el-input>
        </template>
        <!--加载下拉选择框组件-->
        <template v-if="element.type == 'select'">
          <el-select
            :placeholder="element.options.placeholder"
            v-model="element.options.defaultValue"
          ></el-select>
        </template>
        <el-button type="text" class="delete-action" @click="onDelete(index)">
          删除
        </el-button>
      </el-form-item>
    </draggable>
  </el-form>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: {
    Draggable,
  },
  props: ["data", "config"],
  data() {
    return {
      widgetList: this.data,
      selectWidget: this.select, // 定义当前选中的元素
    };
  },
  watch: {
    // 添加对 select、 slectWidget 的监听
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true, // 为了发现对象内部值的变化
    },
    widgetList(val) {
      console.log(val);
      this.$emit("update:data", val);
    },
  },
  methods: {
    // 选中单个元素触发的事件
    handleWidgetSelect(item) {
      this.selectWidget = item;
    },
    onAdd(evt) {
      const newIndex = evt.newIndex;
      const key = new Date().getTime();
      this.$set(this.widgetList, newIndex, {
        ...this.widgetList[newIndex],
        options: {
          ...this.widgetList[newIndex].options,
        },
        key,
        model: this.widgetList[newIndex].type + "_" + key, // 用于绑定表单填写数据使用
      });
    },
    onDelete(index) {
      this.widgetList.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.el-input {
  width: 98% !important;
}
.delete-action {
  position: absolute;
  bottom: 5px;
  right: -6px;
}
</style>
