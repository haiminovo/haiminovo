interface IProps {
    className?: string;
}

export default function Banner(props: IProps) {
    const { className } = props;
    return (
        <div
            className={`flex flex-col items-center justify-center w-full h-80 gap-2 p-4 text-3xl font-black underline shadow-xl rounded-2xl cursor-pointer
                bg-custom-color-10 dark:bg-custom-color-dark-10 bg-bottom bg-no-repeat bg-contain border dark:border-custom-color-dark-7 ${className}`}
        >
            <span>Site In Developing</span>
        </div>
    );
}
