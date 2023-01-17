<template>
  <el-row :gutter="50">
    <el-col :span="6">
      <h3>Draggable 1</h3>
      <draggable
        class="list-group"
        tag="ul"
        v-model="list1"
        v-bind="dragOptions1"
      >
        <li class="list-group-item" v-for="element in list1" :key="element.id">
          {{ element.name }}
        </li>
      </draggable>
    </el-col>
    <el-col :span="6">
      <h3>Draggable 2</h3>
      <draggable
        class="list-group"
        tag="ul"
        v-model="list2"
        v-bind="dragOptions2"
      >
        <li class="list-group-item" v-for="element in list2" :key="element.id">
          {{ element.name }}
        </li>
      </draggable>
    </el-col>
    <el-col :span="6">
      <h3>List 1</h3>
      <pre style="text-align: start; background: #f3f3f3">{{
        JSON.stringify(list1, null, 2)
      }}</pre>
    </el-col>
    <el-col :span="6">
      <h3>List 2</h3>
      <pre style="text-align: start; background: #f3f3f3">{{
        JSON.stringify(list2, null, 2)
      }}</pre>
    </el-col>
  </el-row>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      list1: [
        { name: "Jesus", id: 1 },
        { name: "Paul", id: 2 },
        { name: "Peter", id: 3 },
      ],
      list2: [
        { name: "Luc", id: 5 },
        { name: "Thomas", id: 6 },
        { name: "John", id: 7 },
      ],
      dragOptions1: {
        animation: 200,
        group: { name: "people", pull: "clone", put: false }, // 配置项
        disabled: false,
        ghostClass: "ghost",
      },
      dragOptions2: {
        animation: 200,
        group: "people",
        disabled: false,
        ghostClass: "ghost",
      },
    };
  },
};
</script>

<style lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
}
.list-group-item {
  cursor: move;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
}
</style>
