'use client';
import React, { useState } from 'react';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import Links from '../links/Links';

interface IProps {
    className?: string;
}

export default function Menu(props: IProps) {
    const { className } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {isExpanded && <Links className="flex-row" showIcon={false}></Links>}
            <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <RightOutlined /> : <MenuOutlined />}
            </div>
        </div>
    );
}
