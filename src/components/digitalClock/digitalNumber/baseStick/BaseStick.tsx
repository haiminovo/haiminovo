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
    if (!active) return <div className="h-3 w-12"></div>;
    const basicStickStyle =
        'relative bg-custom-color-dark-4 dark:bg-custom-color-4 h-3 w-12 transition-all duration-700 ' +
        `before:absolute before:left-0 before:w-3 before:h-3 before:bg-custom-color-2 dark:before:bg-custom-color-dark-2 ` +
        `after:absolute after:right-0 after:w-3 after:h-3 after:bg-custom-color-2 dark:after:bg-custom-color-dark-2 `;
    const directionStickStyle =
        'before:[clip-path:polygon(_0%_0%,_-100%_100%,_100%_0%,_0%_0%)] ' +
        'after:[clip-path:polygon(_0%_0%,_200%_100%,_100%_0%,_0%_0%)] ' +
        `${directionDegreeMap[direction]}`;
    const midStickStyle =
        'before:[clip-path:polygon(_0%_0%,_100%_0%,_0%_25%,_0%_75%,_100%_100%,_0%_100%,_0%_0%)] ' +
        'after:[clip-path:polygon(_0%_0%,_100%_0%,_100%_100%,_0%_100%,_100%_75%,_100%_25%,_0%_0%)] ';
    return direction === 'mid' ? (
        <div className={`${basicStickStyle + midStickStyle} `}></div>
    ) : (
        <div className={`${basicStickStyle + directionStickStyle} `}></div>
    );
}
