import Link from 'next/link';

export default function Links() {
    const links: { title: string; path: string }[] = [
        {
            title: '首页',
            path: '/',
        },
        {
            title: '面板',
            path: '/dashboard',
        },
    ];
    return (
        <div className="flex w-full gap-3 justify-end text-slate-200">
            {links.map((item) => (
                <Link key={item.title} href={item.path}>
                    {item.title}
                </Link>
            ))}
        </div>
    );
}
