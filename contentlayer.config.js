import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
    // 定义计算字
    slug: {
        // 计算字段用于生成文档的URL slug
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        // 计算字段用于生成文档的URL参数形式的slug
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
};

// defineDocumentType 定义文档类型。可以这个参考格式定义多种文档。
export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`, // 指定匹配的文件路径模式
    contentType: 'mdx', // 指定了文档类型为 mdx
    fields: {
        // 定义文档的字段结构，因为我接下来的示例中只用到title和description字段，所以其他字段被我注释掉了。如果此处配置的字段和实际mdx文件中用到的不一样，编译会报错
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        date: {
            type: 'date',
            required: true,
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
        },
        // published: {
        //   type: "boolean",
        //   default: true,
        // },
        // image: {
        //   type: "string",
        //   required: true,
        // },
        authors: {
            type: 'list',
            of: { type: 'string' },
            required: true,
            default: ['haiminovo'],
        },
    },
    computedFields,
}));

// makeSource 创建数据源
export default makeSource({
    contentDirPath: './content', // 指定内容文件的目录路径
    documentTypes: [Post], // 指定使用的文档类型，支持多个
    mdx: {
        // 配置MDX解析器的插件
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    onVisitLine(node) {
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }];
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted');
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted'];
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    },
});
