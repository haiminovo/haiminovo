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
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className={`flex gap-3 font-light text-sm`}>
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
        </div>
    );
}
