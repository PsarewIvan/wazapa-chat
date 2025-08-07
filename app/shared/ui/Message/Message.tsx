import React, { memo } from 'react';
import type { AttachmentType, MessageType } from '~/shared/types/message';
import styles from './Message.module.scss';
import classNames from 'classnames';
import MessageImages from '../MessageImages/MessageImages';
import SenderCorner from '~/shared/icons/SenderCorner';
import ReceiverCorner from '~/shared/icons/ReceiverCorner';
import { getFormattedTime } from '~/shared/helpers/getFormattedTime';

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
    const images = attachments?.filter((item) => item.type === 'image');

    return (
        <div
            className={classNames(styles['message'], className, {
                [styles['message_own']]: hasOwn,
            })}
        >
            {images && <MessageImages images={images} />}
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
