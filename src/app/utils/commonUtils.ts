import { message } from 'antd';
import { Base64 } from 'js-base64';
import { debounce } from 'lodash';

export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

export function classNames(...classNames: string[]) {
    return classNames.join(' ');
}

export function getRandomCharacter(length: number = 1) {
    let character = '';
    while (length) {
        const unicode = getRandom(19968, 40959); //unicode基本汉字编码范围（4E00 - 9FFF）对应十进制
        character += String.fromCharCode(unicode);
        length--;
    }
    return character;
}

export function base64Encode(value: string) {
    const base64 = Base64.encode(value);
    return base64;
}

export function getLocal(name: string) {
    let value = null;
    try {
        if(!localStorage.getItem(name))return;
        value = JSON.parse(localStorage.getItem(name) || '');
    } catch (err) {
        console.error(`获取本地数据${name}失败`);
    }
    return value;
}

export function setLocal(name: string, value: any) {
    const oldValue = getLocal(name);
    if (typeof value == 'object') {
        if (oldValue !== '') {
            return localStorage.setItem(name, JSON.stringify({ ...oldValue, ...value }));
        } else {
            return localStorage.setItem(name, JSON.stringify(value));
        }
    }
    return localStorage.setItem(name, value);
}

export function timestampToTime(timestamp: any) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
