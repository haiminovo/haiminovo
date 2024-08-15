import React from 'react';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default function Aside(props: IProps) {
    const { children, className } = props;
    return (
        <aside className={`flex flex-col flex-shrink-0 gap-3 items-center w-48 p-3 text-sm ${className}`}>
            {children}
        </aside>
    );
}
