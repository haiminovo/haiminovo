import React from 'react';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default function Aside(props: IProps) {
    const { children, className } = props;
    return (
        <aside className={`flex flex-col gap-3 items-center w-52 p-3 text-sm max-xl:w-32 ${className}`}>
            {children}
        </aside>
    );
}
