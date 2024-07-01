interface IProps {
    className?: string;
}
// 评论
export default function Comment(props: IProps) {
    const { className } = props;
    return <div className={`flex h-36 ${className}`}></div>;
}
