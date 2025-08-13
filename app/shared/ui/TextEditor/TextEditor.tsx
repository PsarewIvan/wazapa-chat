import { memo, useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { toggleMark } from './helpers';
import type { TextEditorValue } from './types';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';
import EmojiButton from './EmojiButton/EmojiButton';
import styles from './TextEditor.module.scss';

const EMPTY_VALUE: TextEditorValue = [{ children: [{ text: '' }] }];

type Props = {
    value: TextEditorValue | null;
    onChange: (value: TextEditorValue) => void;
};

function TextEditor({ value, onChange }: Props) {
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <Slate
            key={JSON.stringify(value ?? '')}
            editor={editor}
            initialValue={value ?? EMPTY_VALUE}
            onChange={onChange}
        >
            <HoveringToolbar />
            <div className={styles['editable-wrapper']}>
                <Editable
                    className={styles['editable']}
                    renderLeaf={(props) => <Leaf {...props} />}
                    placeholder="Введите сообщение"
                    onDOMBeforeInput={(event: InputEvent) => {
                        switch (event.inputType) {
                            case 'formatBold':
                                event.preventDefault();
                                return toggleMark(editor, 'bold');
                            case 'formatItalic':
                                event.preventDefault();
                                return toggleMark(editor, 'italic');
                            case 'formatUnderline':
                                event.preventDefault();
                                return toggleMark(editor, 'underline');
                        }
                    }}
                />
                <EmojiButton />
            </div>
        </Slate>
    );
}

export default memo(TextEditor);
