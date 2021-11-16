import {block} from './utils/blockFormat'
import {blockColor} from './utils/staticConfig'

const BLOCK_SIZE_RANDOM = 5;
const BLOCK_COLOR_RANDOM = 9;
const TURN_BLOCK_RANDOM = 3;

/**
 * 获取随机数 取整
 * scope:随机数取值范围
 * 随机方块形状5种情况：0，1，2，3，4，5
 * 随机方块颜色5种情况：0，1，2，3，4，5
 * 旋转方块次数3种情况：0，1，2，3      注: 旋转方块 0 为不旋转
 **/
export const getRanDomSquare = (scope: number = BLOCK_SIZE_RANDOM) => parseInt(String(Math.random() * (scope + 1)));


/**
 * 旋转方块
 */
export const blockRotation = (turnRandom: number = 0, newBlock?: any) => {
    // 获取n的维度
    let vecor = newBlock.length
    // 旋转几个90°
    for (let i = 0; i < turnRandom; i += 1) {
        //垂直反转
        for (let i = 0; i < vecor / 2; i++) {
            for (let j = 0, tmp; j < vecor; j++) {
                tmp = newBlock[i][j][2]
                newBlock[i][j][2] = newBlock[vecor - i - 1][j][2]
                newBlock[vecor - i - 1][j][2] = tmp
            }
        }
        //对角线翻转
        for (let i = 0; i < vecor; i++) {
            for (let j = 0, tmp; j < i; j++) {
                tmp = newBlock[i][j][2]
                newBlock[i][j][2] = newBlock[j][i][2]
                newBlock[j][i][2] = tmp
            }
        }
    }
    return newBlock
}

/**
 * 随机方块颜色
 */
export const getBlockColor = () => {
    // 获取随机颜色 色值
    let color = blockColor[getRanDomSquare(BLOCK_COLOR_RANDOM)];
    return `#${color}`
}

/**
 * 获取新方块
 *      a.获取随机方块
 *      b.随机选装方块
 */
export const getNewBlock = () => {
    // 获取随机方块
    let newBlock = block[getRanDomSquare()];
    // 获取随机旋转次数
    // const turnRandom = getRanDomSquare(TURN_BLOCK_RANDOM);
    // // 随机数为0时 不旋转
    // if (turnRandom !== 0) {
    //     newBlock = clockRotation(turnRandom, newBlock)
    // }
    return newBlock;
};


export default {
    getNewBlock,
    blockRotation,
    getBlockColor,
    getRanDomSquare,
}
