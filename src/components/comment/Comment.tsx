'use client';
import Giscus from '@giscus/react';

export default function Comment() {
    return (
        <Giscus
            id="comments"
            repo="haiminovo/haiminovo"
            repoId="R_kgDOMPKLVA"
            data-category="Announcements"
            data-category-id="DIC_kwDOMPKLVM4ChGRd"
            mapping="url"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="zh-CN"
            loading="lazy"
        />
    );
}
