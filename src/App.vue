<!--
 * @actName:
 * @author: Ronghua lin
 * @createDate: 2021/11/10
 * @filePath: D:\B-Code\SnakeGame\src\App.vue
-->
<template>
  <div class="canvas-view">
    <div class="bg">
      <BcGg :mapArr="mapsArr" :updateMap="updateMaps" :blockColor="color"></BcGg>
    </div>
    <div class="block">
      <Block @mapArr="mapArr" @updateMap="updateMap" :operationBlock="opera" @blockColor="blockColor"></Block>
    </div>
  </div>

  <div class="info-view">
    <div>分数：0</div>
    <div>分数：0</div>


    <button @click="handleOpera('left')" style="margin-top: 7rem">向左</button>
    <button @click="handleOpera('right')">向右</button>
    <button @click="handleOpera('rotate')">旋转</button>
  </div>

</template>

<script setup lang="ts">
import BcGg from "./components/BcGg.vue"
import Block from "./components/Block.vue";
import {canvasWidth, canvasHeight} from './utils/staticConfig';

import {defineProps, nextTick, watch, ref} from 'vue';

const infoHeighCss = `${canvasHeight}px`
const props = defineProps({mapArr: Array})

// 随机颜色传值
const color = ref('');
const blockColor = (value: string) => {
  color.value = value
};

// 点击操作按钮
const opera = ref('');
const handleOpera = (name: string) => {
  opera.value = name;

  setTimeout(() => {
    opera.value = ''
  }, 200)
};

const mapsArr = ref([]);
const mapArr = (e: any) => {
  mapsArr.value = e;
}

const updateMaps = ref('');
const updateMap = (e: any) => {
  updateMaps.value = e;
}


</script>

<style lang="scss">
body {
  margin: 0;
  /*overflow-y: hidden;*/
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.canvas-view {
  position: relative;

  .bg {
    position: absolute;
    top: 0;
  }

  .block {
    position: absolute;
    top: 0;
  }
}

.info-view {
  width: 33%;
  min-height: v-bind(infoHeighCss);
  padding-top: .2rem;
  box-sizing: border-box;
  background-color: #e7e4e4;
  border: solid 6px #2b2a2a;
}
</style>
