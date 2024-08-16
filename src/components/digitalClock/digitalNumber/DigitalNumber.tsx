import React from 'react';
import BaseStick from './baseStick/BaseStick';

interface IProps {
    value: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | ':';
}

const stickActiveMap = {
    //  0  1  2  3  4  5  6  7  8  9
    0: [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    1: [1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    2: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    3: [0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    4: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    5: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    6: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
};

export default function DigitalNumber(props: IProps) {
    const { value = 8 } = props;
    if (value === ':') {
        return (
            <div className="flex flex-col items-center justify-center gap-8 p-4">
                <div
                    className={`h-3 w-3 rounded-md bg-custom-color-dark-4 dark:bg-custom-color-4`}
                ></div>
                <div
                    className={`h-3 w-3 rounded-md bg-custom-color-dark-4 dark:bg-custom-color-4`}
                ></div>
            </div>
        );
    }
    return (
        <div className="w-14">
            <div className="relative flex w-36 translate-x-2 flex-col">
                <BaseStick direction="top" active={!!stickActiveMap[0][value]}></BaseStick>
                <div className="m-4 flex translate-x-[-40px]">
                    <BaseStick direction="left" active={!!stickActiveMap[1][value]}></BaseStick>
                    <BaseStick direction="right" active={!!stickActiveMap[2][value]}></BaseStick>
                </div>
                <BaseStick direction="mid" active={!!stickActiveMap[3][value]}></BaseStick>
                <div className="m-4 flex translate-x-[-40px]">
                    <BaseStick direction="left" active={!!stickActiveMap[4][value]}></BaseStick>
                    <BaseStick direction="right" active={!!stickActiveMap[5][value]}></BaseStick>
                </div>
                <BaseStick direction="bottom" active={!!stickActiveMap[6][value]}></BaseStick>
            </div>
        </div>
    );
}
