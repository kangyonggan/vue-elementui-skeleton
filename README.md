# vue-elementui-skeleton
基于Vue+ElementUI的骨架屏。使用指令`v-skeleton`的方式生成骨架屏，可自动识别常用的ElementUI组件并生成对应的骨架屏。
也提供了N多参数以便进行个性化配置。

- el-table：自识别：宽度、列数、行高。可配置：行数、圆角、背景色
- el-menu：TODO
- el-breadcrumb：TODO
- ...

## 效果
![效果](./demo.gif)

## 安装
```
npm i vue-elementui-skeleton
```

## 引入
```js
import Vue from 'vue';
import VueElementUISkeleton from 'vue-elementui-skeleton';

Vue.use(VueElementUISkeleton);

// 可以设置选项的全局默认值和指令名称
/*
Vue.use(VueElementUISkeleton, {
    directiveName: 'my-skeleton',
    rows: 10,
    radius: 3,
    bg: 'red'
});
*/
```

## 基础用法
以表格为例，展示基础用法。

```html
<template>
  <el-table
    v-skeleton="loading"
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="日期"
      width="180"
    />
    <el-table-column
      prop="name"
      label="姓名"
      width="180"
    />
    <el-table-column
      prop="address"
      label="地址"
    />
  </el-table>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                tableData: []
            };
        },
        mounted() {
            // 模拟请求耗时2s
            let that = this;
            that.loading = true;
            setTimeout(function () {
                that.loading = false;
                that.tableData = [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
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
                    address: '上海市普陀区金沙江路 1516 弄'
                }];
            }, 2000);
        }
    };
</script>
```

## 配置行数
el-table默认骨架屏的行数为5行，下例修改为10行。

```html
<template>
  <el-table
    v-skeleton="{loading: loading, rows: 10}"
    :data="tableData"
    style="width: 100%"
  >
    <!-- columns -->
  </el-table>
</template>
```

## 选项
| 选项 | 说明 | 类型 | 可选值 | 默认值 |
| ----- | ----- | ----- | ----- | ----- |
| loading | true时渲染骨架屏 | Boolean | - | false |
| rows | 行数，只对el-table生效 | Number | - | 5 |
| radius | 圆角像素 | Number | - | 5 |
| bg | 骨架背景色 | String | - | #eaebed |

## 其他
- 项目地址：[https://github.com/kangyonggan/vue-elementui-skeleton](https://github.com/kangyonggan/vue-elementui-skeleton)
- 作者主页：[https://kangyonggan.com](https://kangyonggan.com)
- 作者邮箱：java@kangyonggan.com