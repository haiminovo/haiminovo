export const generateColor = (str: string, mode: 'dark' | 'light' = 'light') => {
    let basicColor = hexToRgb(str);
    if (!basicColor) return;
    if (mode === 'dark') basicColor = basicColor.map((item) => item - 100);
    const stepArr = basicColor.map((item) =>
        mode === 'dark' ? (item / 10).toFixed(0) : ((255 - item) / 10).toFixed(0)
    );
    return new Array(10).fill(0).map((item, index) => {
        const targetColor = basicColor.map((_item, _index) => {
            return mode === 'dark'
                ? _item - index * +stepArr[_index] < 0
                    ? 0
                    : _item - index * +stepArr[_index]
                : _item + index * +stepArr[_index] > 255
                ? 255
                : _item + index * +stepArr[_index];
        });
        return `rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`;
    });
};

export const hexToRgb = (str: string) => {
    let hexs = null;
    let reg = /^\#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(str)) return alert('色值不正确');
    str = str.replace('#', ''); // 去掉#
    hexs = str.match(/../g); // 切割成数组 409EFF => ['40','9E','FF']
    // 将切割的色值转换为16进制
    return hexs?.map((item) => parseInt(item, 16)); // 返回rgb色值[64, 158, 255]
};

export const setLS = (k: string, v: string) => {
    try {
        localStorage.setItem(k, v);
    } catch (e) {}
};

export const removeLS = (k: string) => {
    try {
        localStorage.removeItem(k);
    } catch (e) {}
};

export const getLS = (k: string) => {
    try {
        return localStorage.getItem(k);
    } catch (e) {
        return; // 与 localStorage 中没有找到对应 key 的行为一致
    }
};
