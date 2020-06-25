
## 下载弹框基础组件
```
npm i vue-base-dialog -S
```

### 引入方式有两种，第一种在自建的xxx.vue弹框文件中引入
```
import VueBaseDialog from 'vue-base-dialog'
components: {
  VueBaseDialog
},
```
### 第二种在main.js中引入并挂载到全局
```
import VueBaseDialog from 'vue-base-dialog'
Vue.use(VueBaseDialog)
```

### 在自建的xxx.vue弹框文件模板中使用
```
<template>
  <div>
    <vue-base-dialog ref="VueBaseDialog" :dialogConfig="dialogConfig">
      <!-- 这里是弹框内容 -->
    </vue-base-dialog>
  </div>
</template>
<sctipt>
  export default {
    props: ['dialogConfig'],
    data(){
      return {

      }
    },
    method: {
      // 关闭该弹框
      yourMethodName(){
        this.$refs.VueBaseDialog.close();
      }
    }
  }
</script>
```

### 将自建的xxx.vue弹框文件在父组件引入并配置
```
<template>
  <div class="parent">
    <div @click="openDialog()">打开弹框</div>
    <!-- 对应普通引入方式 -->
    <dialog v-if="dialogConfig.name" :dialogConfig="dialogConfig"></dialog>
    <!-- 对应动态组件引入方式 -->
    <component :is="dialogConfig.name" :dialogConfig="dialogConfig"></component>
  </div>
</template>
<script>
  import dialogs from '@/components/dialog.vue' // 对应普通引入方式
  export default {
    components: {
      dialog, // 对应普通引入方式
      dialog: () => import('@/components/dialog.vue') // 对应动态组件引入方式
    },
    data(){
      return {
        dialogConfig: {
          name: '', // 自定义弹框名称 必须
          title: '', // 弹框标题 非必须
          selHeader: false, // 是否自定义弹框头部，默认为false 非必须
          drag: false, // 是否可拖拽，默认为false 非必须
          mask: false, // 是否显示遮罩，默认为false 非必须
          maskClick: false, // 遮罩是否可点击，默认为false 非必须
          animationEnter: '', // 自定义弹框调出时动画类，默认为内置动画 非必须
          animationLeave: '', // 自定义弹框销毁时动画类，默认为内置动画 非必须
          destroyTime: 300, // 自定义弹框销毁时间，与动画时间保持一致，默认为300ms 非必须
        }
      }
    },
    methods: {
      // 调出弹框
      openDialog(){
        this.dialogConfig.name = 'dialog';
      },
    }
  }
</script>
```

### 可嵌套使用，弹框中嵌套子弹框
