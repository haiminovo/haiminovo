import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import type { Post } from 'contentlayer/generated';

interface IProps {
    data: Post;
    className?: string;
    onClick?: () => void;
}

export default function PostItem(props: IProps) {
    const { data, className, onClick } = props;
    const { title, description, authors, date, tags, image } = data;
    return (
        <div
            style={{
                background: `url(${image})`,
                backgroundPosition: 'center',
            }}
            className={`flex flex-col justify-between w-full gap-2 px-6 py-4 shadow-2xl rounded-2xl cursor-pointer
                bg-bottom bg-no-repeat bg-contain ${className}`}
            onClick={onClick}
        >
            <div className="flex flex-col mix-blend-exclusion">
                <div className="flex items-start">
                    <div className="flex flex-col justify-center gap-2 w-full">
                        <strong className="text-lg font-medium break-all text-white/80">{title}</strong>
                        <p className="w-full text-ellipsis line-clamp-3 break-all text-white/80">{description}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between flex-wrap w-full gap-2 bottom-2 left-1/2 max-[424px]:flex-col">
                <ul className="flex items-center flex-wrap gap-2 text-font-strong dark:text-font-light-dark">
                    {tags?.map((item) => (
                        <li
                            key={item}
                            className="flex items-center rounded-md gap-2 px-2 py-1 text-xs text-nowrap shadow-md bg-gradient-to-tl 
                                from-custom-color-1 to-custom-color-5 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 "
                        >
                            #{item}
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center flex-wrap gap-2 text-font-strong dark:text-font-light-dark ">
                    <li
                        className="flex items-center flex-wrap gap-2 rounded-md px-2 py-1 text-xs shadow-md bg-gradient-to-t
                            from-custom-color-1 to-custom-color-5 dark:from-custom-color-dark-7 dark:to-custom-color-dark-5"
                    >
                        <UserOutlined />
                        {authors.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </li>
                    <li
                        className="flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1 text-xs shadow-md bg-gradient-to-t
                            from-custom-color-1 to-custom-color-5 dark:from-custom-color-dark-7 dark:to-custom-color-dark-5"
                    >
                        <ClockCircleOutlined />
                        <div>{date.slice(0, 10)}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
