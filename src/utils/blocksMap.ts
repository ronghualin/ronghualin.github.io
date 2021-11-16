import {gridRows, gridCols} from './staticConfig';

/**
 * 初始化地图  现在所有的位置type都是0
 */
export const map = () => {
    let maps = [];
    for (let i = 0; i < gridRows; i += 1) {
        const arr: Array<number> = [];
        for (let j = 0; j < gridCols; j += 1) {
            arr.push(0);
        }
        maps.push(arr);
    }
    return maps;
}

export default {
    map,
}
