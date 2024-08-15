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
                background: `#888 url(${image})`,
                backgroundPosition: 'center',
            }}
            className={`relative flex flex-col justify-between w-full gap-4 p-4 shadow-2xl rounded-xl cursor-pointer
                bg-bottom bg-no-repeat bg-contain ${className}`}
            onClick={onClick}
        >
            <div className="absolute -top-1 -left-1 z-20 scale-150">📎</div>
            <div className="absolute -top-1 -right-1 z-20 -scale-x-150 scale-y-150">📎</div>
            <div className="flex flex-col mix-blend-luminosity">
                <div className="flex items-start">
                    <div className="flex flex-col justify-center gap-4 w-full">
                        <strong
                            className="text-lg indent-2 break-all rounded-xl px-2 py-1 shadow-inner font-black
                            text-black/65 dark:text-white
                            bg-custom-color-10/80 dark:bg-custom-color-dark-10/80"
                        >
                            # {title}
                        </strong>
                        <p
                            className="text-ellipsis line-clamp-3 break-all rounded-xl p-2 leading-6 shadow-inner font-semibold
                            text-black/65 dark:text-white
                            bg-custom-color-7/70 dark:bg-custom-color-dark-7/70"
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between flex-wrap w-full gap-2 bottom-2 left-1/2 max-[424px]:flex-col">
                <ul className="flex items-center flex-wrap gap-2 text-font-strong dark:text-font-light-dark">
                    {tags?.map((item) => (
                        <li
                            key={item}
                            className="flex items-center rounded-md gap-2 px-2 py-1 text-xs text-nowrap shadow-md bg-gradient-to-tl 
                                from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 "
                        >
                            # {item}
                        </li>
                    ))}
                </ul>
                <ul className="flex items-center flex-wrap gap-2 text-font-strong dark:text-font-light-dark ">
                    <li
                        className="flex items-center flex-wrap gap-2 rounded-md px-2 py-1 text-xs shadow-md bg-gradient-to-t
                            from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-7 dark:to-custom-color-dark-3"
                    >
                        <UserOutlined />
                        {authors.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </li>
                    <li
                        className="flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1 text-xs shadow-md bg-gradient-to-t
                            from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-7 dark:to-custom-color-dark-3"
                    >
                        <ClockCircleOutlined />
                        <div>{date.slice(0, 10)}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
