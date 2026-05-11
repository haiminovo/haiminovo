import Image from 'next/image';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense>
			<div className="flex flex-col gap-4 px-5 pb-4 pt-5 max-md:px-4 max-md:pt-4">
				<section className="home-hero">
					<div className="home-hero__content">
						<div className="home-hero__avatar-shell">
							<div className="home-hero__avatar-ring">
								<Image
									className="h-full w-full rounded-full object-cover"
									src="/haimin.jpg"
									alt="haimin 头像"
									width={136}
									height={136}
									priority
								/>
							</div>
						</div>
						<div className="home-hero__copy">
							<h1 className="home-hero__title">Hi，我是 haimin。</h1>
							<p className="home-hero__intro">记录前端实现、设计想法，以及一些值得留住的生活片段。</p>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-2">
					<div className="flex flex-col gap-1 px-1">
						<h2 className="text-font-strong dark:text-font-light-dark text-2xl font-black">近期更新</h2>
					</div>
					<PostList size={3}></PostList>
				</section>
			</div>
		</Suspense>
	);
}
