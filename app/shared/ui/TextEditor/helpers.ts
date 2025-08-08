import { Editor, type BaseEditor } from 'slate';
import type { CustomTextKey } from './types';

export const isMarkActive = (editor: BaseEditor, format: CustomTextKey) => {
    const marks = Editor.marks(editor) as Record<CustomTextKey, boolean> | null;

    return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: BaseEditor, format: CustomTextKey) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};
