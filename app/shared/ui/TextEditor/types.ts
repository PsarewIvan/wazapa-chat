import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

export type CustomText = {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    // MARKDOWN PREVIEW SPECIFIC LEAF
    underlined?: boolean;
    title?: boolean;
    list?: boolean;
    hr?: boolean;
    blockquote?: boolean;
    text: string;
};

export type CustomTextKey = keyof Omit<CustomText, 'text'>;

export type CustomEditor = BaseEditor &
    ReactEditor & {
        nodeToDecorations?: Map<Element, Range[]>;
    };

export type TextEditorValue = Descendant[];
