<!-- 地图组件 -->
<template>
  <canvas ref="myCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script lang='ts' setup>
import {nextTick, onMounted, Ref, ref, defineProps, watch, isRef} from 'vue';
import {blockRotation, getBlockColor} from "../blocks"
import {canvasWidth, canvasHeight} from '../utils/staticConfig';

const props = defineProps({mapArr: Array, updateMap: String, blockColor: String})
const myCanvas = ref();
const ctx = ref();

nextTick(() => {
  ctx.value = myCanvas.value.getContext("2d")
  initCanvasMap(20, 20, '#999999', .8);
})


watch(() => props.updateMap, () => {
  props.mapArr.forEach((item: any, index: number) => {
    item.forEach((_item: any, _index: number) => {
      if (_item === 1) {
        ctx.value.fillStyle = props.blockColor;
        ctx.value.fillRect(_index * 20, index * 20, 20, 20);
      }
    })
  })
})

const initCanvasMap = (X: any, Y: any, color: any, lineWidth: any) => {
  // 创建垂直格网线路径
  for (let i = 0; i <= canvasWidth; i += X) {
    ctx.value.moveTo(i, 0);
    ctx.value.lineTo(i, canvasHeight);
  }
  // 创建水平格网线路径
  for (let j = 0; j <= canvasHeight; j += Y) {
    ctx.value.moveTo(0, j);
    ctx.value.lineTo(canvasWidth, j);
  }

  // 设置绘制颜色
  ctx.value.strokeStyle = color;
  // 设置绘制线段的宽度
  ctx.value.lineWidth = lineWidth;
  // 绘制格网
  ctx.value.stroke();
  // 清除路径
  ctx.value.beginPath();
};


</script>

<style lang="scss" scoped>

</style>
