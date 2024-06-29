import React from 'react';
import Links from './links/Links';

export default function Navbar() {
    return (
        <div className="flex items-center h-14 p-4 font-bold bg-gradient-to-tr from-slate-600 to-black">
            <Links></Links>
        </div>
    );
}
