'use client';
import clsx from 'clsx';
import React, { ReactNode, useRef, useState } from 'react';

interface ICopyToClipboard {
	children: ReactNode;
}

export const CopyButton = ({ children }: ICopyToClipboard) => {
	const textInput = useRef<HTMLDivElement>(null);
	const [hovered, setHovered] = useState(false);
	const [copied, setCopied] = useState(false);

	const onEnter = () => {
		setHovered(true);
	};

	const onExit = () => {
		setHovered(false);
		setCopied(false);
	};

	const onCopy = () => {
		setCopied(true);
		if (textInput.current !== null && textInput.current.textContent !== null)
			navigator.clipboard.writeText(textInput.current.textContent);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="code-block relative">
			{hovered && (
				<button
					aria-label="Copy code"
					type="button"
					className={clsx(
						'absolute right-2 top-2 z-10 h-8 w-8 rounded border-2 bg-gray-700 p-1 text-font-light-dark dark:bg-gray-800',
						{
							'border-green-400': copied,
							'hover:border-gray-300': !copied,
						}
					)}
					onClick={onCopy}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke={copied ? '#00ff00' : '#ffffff'}
						fill="none"
					>
						{copied ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						)}
					</svg>
				</button>
			)}
			{children}
		</div>
	);
};
