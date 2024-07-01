import Post from '../post/Post';

export default function PostList() {
    const posts: {
        title: string;
    }[] = [
        {
            title: '1',
        },
        {
            title: '2',
        },
        {
            title: '2',
        },
        {
            title: '2',
        },
        {
            title: '2',
        },
        {
            title: '2',
        },
        {
            title: '2',
        },
        {
            title: '2',
        },
    ];
    return (
        <div className="flex flex-col w-full gap-3 text-[#666]">
            {posts.map((item, index) => (
                <Post key={index} className='cursor-pointer'></Post>
            ))}
        </div>
    );
}
