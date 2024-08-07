'use client';
import React from 'react';

interface IProps {}

export default function BackToTop(props: IProps) {
    return (
        <div className="toTopBox fixed flex justify-center bottom-0 text-lg">
            <button
                data-id="--scroll-position"
                onClick={() => {
                    scrollTo(0, 0);
                }}
                className="w-16 h-8 rounded-xl text-sm font-medium bg-gradient-to-b cursor-n-resize
            from-custom-color-dark-1/10 to-custom-color-4/20 
            dark:from-custom-color-dark-6 dark:to-custom-color-dark-4 
            text-font-strong dark:text-font-light-dark"
            >
                %
            </button>
        </div>
    );
}
