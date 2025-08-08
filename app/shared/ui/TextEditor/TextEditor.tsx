import { memo, useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { toggleMark } from './helpers';
import type { TextEditorValue } from './types';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';
import styles from './TextEditor.module.scss';

type Props = {
    value: TextEditorValue;
    onChange: (value: TextEditorValue) => void;
};

function TextEditor({ value, onChange }: Props) {
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <Slate
            key={JSON.stringify(value ?? '')}
            editor={editor}
            initialValue={value}
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
            </div>
        </Slate>
    );
}

export default memo(TextEditor);
