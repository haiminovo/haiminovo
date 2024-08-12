export default function About() {
    const friendLinks: any[] = [{}, {}, {}, {}, {}];
    return (
        <div className="flex flex-col justify-center items-center h-full p-6">
            <ul className="flex flex-wrap w-full gap-4">
                {friendLinks.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="flex-grow basis-[calc(50%-8px)] h-32 rounded-xl shadow-lg bg-custom-color-4 dark:bg-custom-color-dark-4"
                        >
                            <div></div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
