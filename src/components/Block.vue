<!-- 新方块组件 -->
<template>
  <canvas ref="blockCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref, defineEmits, defineProps, version, watch} from 'vue';
import {getNewBlock, getBlockColor} from "../blocks"
import {canvasWidth, canvasHeight, gridRows, gridCols} from '../utils/staticConfig';
import {map} from '../utils/blocksMap';

const props = defineProps({operationBlock: String})
const emit = defineEmits(['mapArr', 'updateMap', 'blockColor'])
const blockCanvas = ref();
let blockNum = 0;
const ctx = ref();
let block: any[] = [];
let mapArr: string | any[] = [];

let startTime = Date.now();
let t = 0;

// 监听用户点击 向左/向右/旋转
watch(() => props.operationBlock, (i, o) => {
  operationBlock(props.operationBlock)
})

// 判断方块是否可以 向左/向右移动
const blockLocation = (direct: string) => {
  let site = false;
  block.forEach((i: any, l: number) => {
    i.forEach((j: any) => {
      if (l === 0 && j[0] <= 0 && j[2] === 1 && direct === 'left') {
        site = true;
        return;
      } else if (l === block.length - 1 && j[0] >= gridCols - 1 && j[2] === 1 && direct === 'right') {
        site = true;
        return
      }
    })
  })
  return site;
};

// 操作方块
const operationBlock = async () => {
  const location = await blockLocation(props.operationBlock)

  block.forEach((i: any, l: number) => {
    i.forEach((j: any) => {
      if (props.operationBlock === 'left' && !location) {
        j[0] -= 1
      } else if (props.operationBlock === 'right' && j[0] < gridCols - 1 && !location) {
        j[0] += 1
      } else {
        // console.log('旋转')
      }
    })
  })
}

// 初始化 block_canvas
const initBlockCanvas = () => {
  ctx.value = blockCanvas.value.getContext("2d")
  drawNewBlock();
}

// 获取新方块 new_block
const drawNewBlock = () => {
  ctx.value.fillStyle = getBlockColor();
  emit('blockColor', getBlockColor())
  block = JSON.parse(JSON.stringify(getNewBlock()));
  blockNum += 1;
  console.log(block)
  block.forEach((item, index) => {
    item.forEach((_item: any, _index: number) => {
      if (_item[2] === 1) {
        ctx.value.fillRect(_item[0] * 20, _item[1] * 20, 20, 20);
      }
    })
  })
  requestAnimationFrame(rafHandle)
};

// 整个方块 3*3/ 4*4 是否触顶
const blockLocationTop = () => {
  let isTop = false;
  block.forEach((i: any, l: number) => {
    i.forEach((j: any) => {
      if (l === 0 && j[1] <= 0 && mapArr[j[1]][j[0]] === 1) {
        isTop = true;
      }
    })
  })
  return isTop;
}

// 整个方块 3*3/ 4*4 是否触底及是否可下落
const blockLocationBottom = () => {
  let isBottom = false;
  block.forEach((i: any, l: number) => {
    i.forEach((j: any) => {
      if (l === block.length - 1 && j[1] >= gridRows - 1 || mapArr[j[1] + 1][j[0]] === 1 && j[2] === 1) {
        isBottom = true;
      }
    })
  })
  return isBottom;
}

// 方块 向下移动
const blockDown = () => {
  let stop = false;
  if (mapArr.length === 0) {
    mapArr = map();
  }
  ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);

  // 是否触顶
  const locationTop: boolean = blockLocationTop();
  // 是否触底
  const locationBottom: boolean = blockLocationBottom();

  if (locationTop) {
    alert('触顶！游戏结束~')
    return true;
  }

  if (!locationBottom) {
    block.forEach((i: any) => {
      i.forEach((j: any) => {
        j[1] += 1;
        if (j[2] === 1) {
          ctx.value.fillRect(j[0] * 20, j[1] * 20, 20, 20);
        }
      })
    })
  } else {
    block.forEach((i: any) => {
      i.forEach((j: any) => {
        if (j[2] === 1) {
          mapArr[j[1]][j[0]] = 1;
          emit('mapArr', mapArr);
          emit('updateMap', `${Math.random()}`);
        }
      })
    })
    stop = true;
    drawNewBlock();
  }
  return stop;
};

// 速度控制
const timeCheck = (time: any) => {
  t += time;
  let stop = false;
  if (t > 100) {
    t = 0;
    stop = blockDown()
  }
  return stop;
}

// 定时器
const rafHandle = () => {
  const stop = timeCheck(Date.now() - startTime)
  startTime = Date.now();
  if (!stop) {
    requestAnimationFrame(rafHandle);
  }
}

onMounted(() => {
  initBlockCanvas()
})


</script>

<style lang='scss' scoped>
.block {
  width: .50rem;
  height: .5rem;
  border: #2c3e50 2px solid;
  margin: 2px;
}
</style>
