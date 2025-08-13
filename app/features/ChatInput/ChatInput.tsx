import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useStore } from '~/shared/providers/StoreContext';
import Microphone from '~/shared/icons/Microphone';
import Paperclip from '~/shared/icons/Paperclip';
import PaperPlane from '~/shared/icons/PaperPlane';
import Button from '~/shared/ui/Button/Button';
import TextEditor from '~/shared/ui/TextEditor/TextEditor';
import styles from './ChatInput.module.scss';

type Props = {
    className?: string;
};

function ChatInput({ className }: Props) {
    const { activeUserId, messageToSend, messageChange } = useStore();

    const value = activeUserId ? (messageToSend[activeUserId] ?? null) : null;

    const handleFileAdd = useCallback(() => {
        // TODO: add function to add file
    }, []);

    const handleMessageSend = useCallback(() => {
        // TODO: add function to send message
    }, []);

    return (
        <div className={classNames(styles['chat-input'], className)}>
            <Button
                className={styles['chat-input__file']}
                onClick={handleFileAdd}
            >
                <Paperclip className={styles['chat-input__file-icon']} />
            </Button>
            <TextEditor value={value} onChange={messageChange} />
            <Button
                className={styles['chat-input__send']}
                type="primary"
                onClick={handleMessageSend}
            >
                {activeUserId && messageToSend[activeUserId] ? (
                    <PaperPlane className={styles['chat-input__send-icon']} />
                ) : (
                    <Microphone className={styles['chat-input__send-icon']} />
                )}
            </Button>
        </div>
    );
}

export default observer(ChatInput);
