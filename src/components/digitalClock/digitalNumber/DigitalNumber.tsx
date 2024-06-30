import React from 'react';
import BaseStick from './baseStick/BaseStick';

interface IProps {
    value: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | ':';
    backgroundColor?: string;
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
    const { value = 8, backgroundColor } = props;
    if (value === ':') {
        return (
            <div className="flex flex-col gap-8 justify-center items-center ">
                <div className={`h-2 w-2 ${'bg-black'}`}></div>
                <div className={`h-2 w-2 ${'bg-black'}`}></div>
            </div>
        );
    }
    return (
        <div className="w-16 overflow-clip">
            <div className="relative flex flex-col w-36 translate-x-2">
                <BaseStick
                    direction="top"
                    active={!!stickActiveMap[0][value]}
                    backgroundColor={backgroundColor}
                ></BaseStick>
                <div className="flex m-5 translate-x-[-45px]">
                    <BaseStick
                        direction="left"
                        active={!!stickActiveMap[1][value]}
                        backgroundColor={backgroundColor}
                    ></BaseStick>
                    <BaseStick
                        direction="right"
                        active={!!stickActiveMap[2][value]}
                        backgroundColor={backgroundColor}
                    ></BaseStick>
                </div>
                <BaseStick
                    direction="mid"
                    active={!!stickActiveMap[3][value]}
                    backgroundColor={backgroundColor}
                ></BaseStick>
                <div className="flex m-5 translate-x-[-45px]">
                    <BaseStick
                        direction="left"
                        active={!!stickActiveMap[4][value]}
                        backgroundColor={backgroundColor}
                    ></BaseStick>
                    <BaseStick
                        direction="right"
                        active={!!stickActiveMap[5][value]}
                        backgroundColor={backgroundColor}
                    ></BaseStick>
                </div>
                <BaseStick
                    direction="bottom"
                    active={!!stickActiveMap[6][value]}
                    backgroundColor={backgroundColor}
                ></BaseStick>
            </div>
        </div>
    );
}
