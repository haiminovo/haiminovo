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
                background: `#fff url(${image})`,
                backgroundPosition: 'center',
            }}
            className={`relative flex flex-col justify-between w-full gap-4 p-4 shadow-xl rounded-xl cursor-pointer
                bg-bottom bg-no-repeat bg-contain ${className}`}
            onClick={onClick}
        >
            <div className="absolute -top-1 -left-1 z-20 scale-150">📎</div>
            <div className="absolute -top-1 -right-1 z-20 -scale-x-150 scale-y-150">📎</div>
            <div className="flex flex-col">
                <div
                    className="flex flex-col justify-center gap-1 p-2 w-full rounded-xl shadow-inner
                        text-black/65 dark:text-white border dark:border-[gray] bg-custom-color-5/80 dark:bg-custom-color-dark-5/80"
                >
                    <strong className="text-lg indent-2 break-all font-black underline underline-offset-4">
                        {`# ${title} => `}
                    </strong>
                    <p className="text-ellipsis indent-6 line-clamp-3 break-all font-semibold">{description}</p>
                </div>
            </div>
            <div className="flex justify-between flex-wrap w-full gap-2 bottom-2 left-1/2 max-[424px]:flex-col">
                <ul className="flex items-center flex-wrap gap-2 text-font-strong dark:text-font-light-dark">
                    {tags?.map((item) => (
                        <li
                            key={item}
                            className="flex items-center rounded-md gap-2 px-2 py-1 text-xs text-nowrap shadow-sm bg-gradient-to-tl 
                                from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 "
                        >
                            # {item}
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center flex-wrap gap-2 text-font-strong dark:text-font-light-dark ">
                    <li
                        className="flex items-center flex-wrap gap-2 rounded-md px-2 py-1 text-xs shadow-sm bg-gradient-to-t
                            from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5"
                    >
                        <UserOutlined />
                        {authors.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </li>
                    <li
                        className="flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1 text-xs shadow-sm bg-gradient-to-t
                            from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5"
                    >
                        <ClockCircleOutlined />
                        <div>{date.slice(0, 10)}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
