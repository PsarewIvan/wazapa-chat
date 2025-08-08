import { memo } from 'react';
import type { RenderLeafProps } from 'slate-react';
import type { BaseText } from 'slate';

type CustomLeaf = BaseText & {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};

interface CustomRenderLeafProps extends Omit<RenderLeafProps, 'leaf'> {
    leaf: CustomLeaf;
}

function Leaf({ attributes, children, leaf }: CustomRenderLeafProps) {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.strikethrough) {
        children = (
            <span style={{ textDecoration: 'line-through' }}>{children}</span>
        );
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    return <span {...attributes}>{children}</span>;
}

export default memo(Leaf);
