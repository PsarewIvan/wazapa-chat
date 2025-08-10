import { memo } from 'react';
import classNames from 'classnames';
import type { MessageStatusType, MessageType } from '~/shared/types/message';
import SenderCorner from '~/shared/icons/SenderCorner';
import ReceiverCorner from '~/shared/icons/ReceiverCorner';
import { getFormattedTime } from '~/shared/helpers/getFormattedTime';
import MessageImages from './MessageImages/MessageImages';
import MessageFiles from './MessageFiles/MessageFiles';
import MessageAudio from './MessageAudio/MessageAudio';
import MessageStatus from '../MessageStatus/MessageStatus';
import styles from './Message.module.scss';

type Props = {
    className?: string;
    hasOwn: boolean;
    status: MessageStatusType;
    text?: string;
    timestamp: Date;
    attachments?: MessageType['attachments'];
};

function Message({
    attachments,
    className,
    hasOwn,
    status,
    text,
    timestamp,
}: Props) {
    const images = attachments?.filter((item) => item.type === 'image') ?? [];
    const files = attachments?.filter((item) => item.type === 'file') ?? [];
    const audios = attachments?.filter((item) => item.type === 'audio') ?? [];

    return (
        <div
            className={classNames(styles['message'], className, {
                [styles['message_own']]: hasOwn,
            })}
        >
            {images && <MessageImages images={images} text={text} />}
            {files && <MessageFiles files={files} />}
            {audios && <MessageAudio audios={audios} />}
            {text && <div className={styles['message__text']}>{text}</div>}
            <div className={styles['message__time']}>
                {getFormattedTime(timestamp)}
                {hasOwn && (
                    <MessageStatus
                        className={styles['message__status']}
                        status={status}
                    />
                )}
            </div>
            {hasOwn ? (
                <SenderCorner className={styles['message__sender-icon']} />
            ) : (
                <ReceiverCorner className={styles['message__receiver-icon']} />
            )}
        </div>
    );
}

export default memo(Message);
