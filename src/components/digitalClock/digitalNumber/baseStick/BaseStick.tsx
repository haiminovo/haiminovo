import React from 'react';
interface IProps {
    active?: boolean;
    direction?: 'top' | 'mid' | 'bottom' | 'left' | 'right';
}
const directionDegreeMap = {
    top: 'rotate-180',
    bottom: '',
    mid: '',
    left: 'rotate-90',
    right: '-rotate-90',
};
export default function BaseStick(props: IProps) {
    const { active = true, direction = 'bottom' } = props;
    if (!active) return <div className="h-2 w-12"></div>;
    const basicStickStyle =
        'relative bg-custom-color-dark-4 dark:bg-custom-color-4 h-2 w-12 ' +
        `before:absolute before:left-0 before:w-2 before:h-2 before:bg-custom-color-4 dark:before:bg-custom-color-dark-4 ` +
        `after:absolute after:right-0 after:w-2 after:h-2 after:before:bg-custom-color-4 dark:after:bg-custom-color-dark-4 `;
    const directionStickStyle =
        'before:[clip-path:polygon(_0%_0%,_-40%_100%,_100%_0%,_0%_0%)] ' +
        'after:[clip-path:polygon(_0%_0%,_140%_100%,_100%_0%,_0%_0%)] ' +
        `${directionDegreeMap[direction]}`;
    const midStickStyle =
        'before:[clip-path:polygon(_0%_0%,_100%_0%,_40%_25%,_40%_75%,_100%_100%,_0%_100%,_0%_0%)] ' +
        'after:[clip-path:polygon(_0%_0%,_100%_0%,_110%_100%,_0%_100%,_60%_75%,_60%_25%,_0%_0%)] ';
    return direction === 'mid' ? (
        <div className={`${basicStickStyle + midStickStyle} `}></div>
    ) : (
        <div className={`${basicStickStyle + directionStickStyle} `}></div>
    );
}
