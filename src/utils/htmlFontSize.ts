/**
 * 页面初始化和resize的时候计算并设置根元素字号，使rem单位准确生效
 *
 * @param uiPageWidth 设计稿的页面宽度
 * @param rate 编码相对于设计稿的数值比例（设计稿尺寸/css尺寸）
 */
export function htmlFontSize(): void {
    const docEl: HTMLElement = document.documentElement;
    const bodyEl: HTMLElement = document.body;
    const recalc = () => {
        const {clientWidth, clientHeight} = docEl;

        if (clientWidth <= clientHeight) {
            // 竖屏
            docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
        } else {
            // 横屏
            docEl.style.fontSize = `${100 * (clientHeight / 750)}px`;
        }
        // 重制body的字号为16px，避免html的字号对px的影响
        // 总感觉这段代码会有问题
        bodyEl.style.fontSize = '16px';
    };

    document.addEventListener('DOMContentLoaded', recalc, false);
    window.onresize = recalc;
    recalc();
}

export default {
    htmlFontSize
}
