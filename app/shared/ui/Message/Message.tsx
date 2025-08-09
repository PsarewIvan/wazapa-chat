import React, { memo } from 'react';
import type { AttachmentType, MessageType } from '~/shared/types/message';
import styles from './Message.module.scss';
import classNames from 'classnames';
import MessageImages from '../MessageImages/MessageImages';
import SenderCorner from '~/shared/icons/SenderCorner';
import ReceiverCorner from '~/shared/icons/ReceiverCorner';
import { getFormattedTime } from '~/shared/helpers/getFormattedTime';
import MessageFiles from '../MessageFiles/MessageFiles';
import MessageAudio from '../MessageAudio/MessageAudio';

type Props = {
    // id: string;
    className?: string;
    hasOwn: boolean;
    text?: string;
    // senderId: string;
    // receiverId: string;
    timestamp: Date;
    // status: MessageStatusType;
    attachments?: Array<{
        type: AttachmentType;
        url: string;
        name?: string;
        size?: number;
    }>;
};

function Message({ attachments, className, hasOwn, text, timestamp }: Props) {
    const images = attachments?.filter((item) => item.type === 'image') ?? [];
    const files = attachments?.filter((item) => item.type === 'file') ?? [];
    const audios = attachments?.filter((item) => item.type === 'audio') ?? [];

    return (
        <div
            className={classNames(styles['message'], className, {
                [styles['message_own']]: hasOwn,
            })}
        >
            {images && <MessageImages images={images} />}
            {files && <MessageFiles files={files} />}
            {audios && <MessageAudio audios={audios} />}
            {text && <div className={styles['message__text']}>{text}</div>}
            <div className={styles['message__time']}>
                {getFormattedTime(timestamp)}
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
