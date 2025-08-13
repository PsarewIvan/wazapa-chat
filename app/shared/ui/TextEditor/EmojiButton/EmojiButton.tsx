import { memo, useCallback, useRef, useState } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import SmileIcon from '~/shared/icons/SmileIcon';
import styles from './EmojiButton.module.scss';

const emojis = ['😀', '😂', '😍', '🔥', '👍', '🎉'];

function EmojiButton() {
    const editor = useSlate();

    const [open, setOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const insertEmoji = useCallback(
        (emoji: string) => {
            Transforms.insertText(editor, emoji);
            setOpen(false);
        },
        [editor]
    );

    function handleInsertButtonClick() {
        setOpen((o) => !o);
    }

    function handleEmojiClick(emoji: string) {
        return () => insertEmoji(emoji);
    }

    return (
        <div className={styles['wrapper']}>
            <button
                ref={buttonRef}
                className={styles['button']}
                type="button"
                onClick={handleInsertButtonClick}
            >
                <SmileIcon className={styles['button__icon']} />
            </button>
            {open && (
                <div className={styles['popup']}>
                    {emojis.map((emoji) => (
                        <button
                            className={styles['popup__button']}
                            key={emoji}
                            type="button"
                            onClick={handleEmojiClick(emoji)}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(EmojiButton);
