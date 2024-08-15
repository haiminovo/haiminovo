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
