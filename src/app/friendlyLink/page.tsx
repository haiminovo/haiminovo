import Image from 'next/image';
import bird0 from 'public/bird0.svg';
export default function FriendlyLink() {
    const friendLinks: any[] = [
        {
            title: 'test的blog',
            desc: '测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容',
            link: 'http://haiminovo.cn',
        },
    ];
    return (
        <div className="flex flex-col items-center h-full p-6 max-md:p-4">
            <ul className="flex flex-wrap w-full gap-4">
                {friendLinks.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="basis-[calc(50%-8px)] h-36 rounded-xl shadow-xl min-w-64 bg-custom-color-4 dark:bg-custom-color-dark-4 max-md:flex-grow"
                        >
                            <a href={item.link} className="flex items-center w-full h-full gap-4 p-4">
                                <div className="relative h-28 w-28">
                                    <Image
                                        className="rounded-xl"
                                        src={bird0}
                                        alt={item.title + '博客图像'}
                                        fill
                                    ></Image>
                                </div>
                                <div className="flex-1 flex flex-col gap-2 h-full">
                                    <strong className="text-xl">{item.title}</strong>
                                    <p className="text-ellipsis break-all line-clamp-3">{item.desc}</p>
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
