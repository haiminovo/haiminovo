import React from 'react';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default function Aside(props: IProps) {
    const { children, className } = props;
    return <aside className={`flex flex-col items-center w-52 p-2 text-sm max-xl:w-32 ${className}`}>{children}</aside>;
}
