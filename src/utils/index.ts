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
    str = str.replace('#', '');
    hexs = str.match(/../g);
    return hexs?.map((item) => parseInt(item, 16));
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
