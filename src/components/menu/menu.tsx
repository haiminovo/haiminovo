'use client';
import React, { useState } from 'react';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import Links, { links } from '../links/Links';
import Link from 'next/link';

interface IProps {
    className?: string;
}

export default function Menu(props: IProps) {
    const { className } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {isExpanded && (
                <div className={`flex gap-3 font-thin`}>
                    {links.map((item) => (
                        <Link
                            key={item.title}
                            href={item.path}
                            className="flex items-center rounded-lg gap-3 hover:bg-custom-color-2 dark:hover:bg-custom-color-dark-2"
                        >
                            <p>{item.title}</p>
                        </Link>
                    ))}
                </div>
            )}
            <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <RightOutlined /> : <MenuOutlined />}
            </div>
        </div>
    );
}
