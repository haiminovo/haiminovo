import { CalendarOutlined, CommentOutlined, DisconnectOutlined, FileTextOutlined } from '@ant-design/icons';

export default function Menu() {
    const blogInfos = [
        {
            title: '文章总计',
            icon: <FileTextOutlined />,
            value: 'mock',
        },
        {
            title: '评论总计',
            icon: <CommentOutlined />,
            value: 'mock',
        },
        {
            title: '运行时长',
            icon: <CalendarOutlined />,
            value: 'mock',
        },
        {
            title: '最后活跃',
            icon: <DisconnectOutlined />,
            value: 'mock',
        },
    ];
    return (
        <div className="flex flex-col w-full p-1 gap-1">
            <h5 className="ml-1 text-[#333] font-normal">博客信息</h5>
            <div className="flex flex-col w-full h-28 bg-[#F3F7F4] rounded-md">
                {blogInfos.map((item) => {
                    return (
                        <li key={item.title} className="flex flex-1 items-center justify-between px-3">
                            <div className="flex gap-2">
                                <span>{item.icon}</span>
                                <span className=" max-xl:hidden">{item.title}</span>
                            </div>
                            <span>{item.value}</span>
                        </li>
                    );
                })}
            </div>
        </div>
    );
}
