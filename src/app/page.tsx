import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense fallback={'loading'}>
            <div className="flex h-full flex-col items-center justify-between">
                <PostList></PostList>
            </div>
        </Suspense>
    );
}
// 样式覆盖格式 className={twMerge('[&.ant-typography]:text-[#888]')}
