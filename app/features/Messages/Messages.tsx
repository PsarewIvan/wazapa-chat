import { useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useStore } from '~/shared/providers/StoreContext';
import { getFormattedTime } from '~/shared/helpers/getFormattedTime';
import type { MessageType } from '~/shared/types/message';
import Message from '~/shared/ui/Message/Message';
import ChatContainer from '~/shared/ui/ChatContainer/ChatContainer';
import styles from './Messages.module.scss';

type Props = {
    className?: string;
};

function Messages({ className }: Props) {
    const { activeUserId, messagesForActiveUser } = useStore();

    const hasPrevOwnRef = useRef(false);

    const groupedMessages = useMemo(() => {
        const result: MessageType[][] = [];
        let group: MessageType[] = [];
        let prevDate: string | null = null;

        messagesForActiveUser.forEach((message) => {
            const msgDate = new Date(message.timestamp);
            const msgDateKey = msgDate.toISOString().split('T')[0];
            prevDate = prevDate === null ? msgDateKey : prevDate;
            const hasGroup = prevDate === msgDateKey;

            if (hasGroup) {
                group.push(message);
            } else {
                prevDate = msgDateKey;
                result.push(group);
                group = [];
            }
        }, []);

        return result;
    }, [messagesForActiveUser]);

    return (
        <ChatContainer className={className} messages={messagesForActiveUser}>
            {groupedMessages.map((group, index) => (
                <section key={index}>
                    <div className={styles['date']}>
                        {getFormattedTime(group[0].timestamp, true)}
                    </div>
                    {group.map((message, index) => {
                        const hasOwn = message.receiverId === activeUserId;
                        const classNameMargin =
                            index !== 0 && hasOwn === hasPrevOwnRef.current
                                ? styles['message_self']
                                : styles['message_group'];

                        return (
                            <Message
                                key={message.id}
                                className={classNames(classNameMargin, {
                                    [styles['message_active']]: hasOwn,
                                })}
                                attachments={message.attachments}
                                hasOwn={message.receiverId === activeUserId}
                                status={message.status}
                                text={message.text}
                                timestamp={message.timestamp}
                            />
                        );
                    })}
                </section>
            ))}
        </ChatContainer>
    );
}

export default observer(Messages);
