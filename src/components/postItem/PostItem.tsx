import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import type { Post } from 'contentlayer/generated';

interface IProps {
    data: Post;
    className?: string;
    onClick?: () => void;
}

export default function PostItem(props: IProps) {
    const { data, className, onClick } = props;
    let { title, description, authors, date, tags, image } = data;
    return (
        <div
            style={{
                background: `rgba(0,0,0,0.2) url(${image})`,
                backgroundPosition: 'center',
            }}
            className={`relative flex w-full cursor-pointer flex-col justify-between gap-4 rounded-xl border bg-contain bg-bottom bg-no-repeat p-4 shadow-xl dark:border-custom-color-dark-4 dark:bg-blend-darken ${className}`}
            onClick={onClick}
        >
            <div className="absolute -left-1 -top-1 z-20 scale-150">📎</div>
            <div className="flex flex-col">
                <div className="flex w-full flex-col justify-center gap-1 rounded-xl border bg-custom-color-5/80 p-2 text-black/80 shadow-inner dark:border-custom-color-dark-7 dark:bg-custom-color-dark-5/80 dark:text-white">
                    <strong className="break-all indent-2 text-lg font-black underline underline-offset-4">
                        {`# ${title} `}
                    </strong>
                    <p className="line-clamp-3 text-ellipsis break-all indent-6 font-semibold">
                        {description}
                    </p>
                </div>
            </div>
            <div className="bottom-2 left-1/2 flex w-full flex-wrap justify-between gap-2 max-[424px]:flex-col">
                <ul className="flex flex-wrap items-center gap-2 text-font-strong dark:text-font-light-dark">
                    {tags?.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-2 text-nowrap rounded-md bg-gradient-to-tl from-custom-color-1 to-custom-color-9 px-2 py-1 text-xs shadow-sm dark:from-custom-color-dark-10 dark:to-custom-color-dark-5"
                        >
                            # {item}
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-wrap items-center gap-2 text-font-strong dark:text-font-light-dark">
                    <li className="flex flex-wrap items-center gap-2 rounded-md bg-gradient-to-t from-custom-color-1 to-custom-color-9 px-2 py-1 text-xs shadow-sm dark:from-custom-color-dark-10 dark:to-custom-color-dark-5">
                        <UserOutlined />
                        {authors.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </li>
                    <li className="flex items-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-t from-custom-color-1 to-custom-color-9 px-2 py-1 text-xs shadow-sm dark:from-custom-color-dark-10 dark:to-custom-color-dark-5">
                        <ClockCircleOutlined />
                        <div>{date.slice(0, 10)}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
