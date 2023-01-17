<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="标题">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="数据绑定参数">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item label="校验">
        <div>
          <el-checkbox v-model="data.options.required">必填</el-checkbox>
        </div>
        <div>
          <el-input
            v-model.lazy="data.options.pattern"
            placeholder="填写正则表达式"
          ></el-input>
        </div> </el-form-item
      ><el-form-item label="数据绑定方法名">
        <el-input v-model="data.options.remoteFunc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // remote 是一些方法对象，在父组件中定义，在下面被调用用来加载动态数据
  props: ["data", "remote"],
  data() {
    return {
      validator: {
        required: null,
        pattern: null,
      },
    };
  },
  mounted() {
    // 加载动态数据
    if (this.data.list) {
      for (let i = 0; i < this.data.list.length; i++) {
        const curItem = this.data.list[i];

        curItem.options.remoteOptions = [];
        if (
          curItem.options.remoteFunc &&
          this.remote[curItem.options.remoteFunc]
        ) {
          this.remote[curItem.options.remoteFunc]((data) => {
            curItem.options.remoteOptions = data.map((item) => {
              return {
                value: item.value,
                label: item.label,
              };
            });
          });
        }
      }
    }
  },
  methods: {
    generateRule() {
      this.data.rules = [];
      Object.keys(this.validator).forEach((key) => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key]);
        }
      });
    },
  },
  watch: {
    "data.options.required": function (val) {
      if (val) {
        this.validator.required = {
          required: true,
          message: `${this.data.name}必须填写`,
        };
      } else {
        this.validator.required = null;
      }

      this.generateRule();
    },
    "data.options.pattern": function (val) {
      if (val) {
        this.validator.pattern = {
          pattern: val,
          message: this.data.name + "格式不匹配",
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    },
  },
};
</script>
