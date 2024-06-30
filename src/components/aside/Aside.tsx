import React, { useEffect, useState } from 'react';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export default function Aside(props: IProps) {
    const { children, className } = props;
    return <aside className={`flex justify-center w-[220px] bg-[#EBF2ED] p-3 ${className}`}>{children}</aside>;
}
