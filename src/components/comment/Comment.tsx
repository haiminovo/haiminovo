'use client';
import { getLS } from '@/utils';
import Giscus from '@giscus/react';

export default function Comment() {
    return (
        <Giscus
            id="comments"
            repo="haiminovo/haiminovo"
            repoId="R_kgDOMPKLVA"
            category="Announcements"
            categoryId="DIC_kwDOMPKLVM4ChGRd"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={getLS('user-color-scheme') || 'noborder_light'}
            lang="zh-CN"
            loading="lazy"
        />
    );
}
