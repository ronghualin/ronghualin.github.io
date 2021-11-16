// 获取屏幕尺寸
export const clientWidth: number = document.documentElement.clientWidth;
export const clientHeight: number = document.documentElement.clientHeight;
// 格子行数
export const gridRows: number = Math.floor(clientHeight / 20);
// 格子列数
export const gridCols: number = Math.floor(clientWidth * 2 / 3 / 20);
// canvas 尺寸
export const canvasWidth: number = gridCols * 20;
export const canvasHeight: number = gridRows * 20;
// 方块颜色
export const blockColor = ['6A5ACD','DC143C','1E90FF','2E8B57','DAA520','D2691E','B22222'];

export default {
    clientWidth,
    clientHeight,
    gridRows,
    gridCols,
    canvasWidth,
    canvasHeight,
    blockColor,
}
