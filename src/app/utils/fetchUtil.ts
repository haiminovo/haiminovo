import siteData from '@/data/siteData';
import { base64Encode, getLocal, setLocal } from './commonUtils';
import { userRefreshToken } from '@/api/user';
import { adminRefreshToken } from '@/api/admin';
import { debounce } from 'lodash';
import { message } from 'antd';

export interface IFetchRes {
    code: number;
    msg: string;
    errorCode: number;
    err?: IErr;
    data?: any;
}

export interface IErr {
    errorCode: number;
    code: number;
    msg: string;
}

async function tokenRefreshMiddleware(url: string, options: RequestInit) {
    const userInf = getLocal('userInf');
    const refreshToken = userInf?.token;
    if (refreshToken) {
        const { id, isAdmin } = userInf;
        const targetInterface = isAdmin ? adminRefreshToken : userRefreshToken;
        const params: any = { id };
        const res: IFetchRes = await targetInterface(params);
        if (res?.code !== 200) return;
        userInf.token = res.data.token;
        setLocal('userInf', userInf);
        const newHeaders = {
            ...options.headers,
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: userInf && `${'Basic ' + base64Encode(userInf?.token + ':')}`,
        };
        options.headers = newHeaders;
        return fetch(url, options).then(async (response) => {
            const res = await response.json();
            return res;
        });
    }else{
        message.warning('请进行身份验证')
    }
}

export const customFetch = (
    url: string = siteData.serverUrl,
    method: string = 'GET',
    data: BodyInit | null = null,
    headers: HeadersInit = {}
) => {
    const userInf = getLocal('userInf');
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: userInf && `${'Basic ' + base64Encode(userInf?.token + ':')}`,
            ...headers,
        },
    };
    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(async (response) => {
            const res = await response.json();
            if (res.code === 401) {
                return tokenRefreshMiddleware(url, options);
            }
            return res;
        })
        .catch((error) => {
            throw error;
        });
};
