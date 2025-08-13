import { Fragment, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useStore } from '~/shared/providers/StoreContext';
import { getFormattedTime } from '~/shared/helpers/getFormattedTime';
import Message from '~/shared/ui/Message/Message';
import ChatContainer from '~/shared/ui/ChatContainer/ChatContainer';
import styles from './Messages.module.scss';

type Props = {
    className?: string;
};

function Messages({ className }: Props) {
    const { activeUserId, messagesForActiveUser } = useStore();

    const [currentDate, setCurrentDate] = useState<string>('');

    const hasPrevOwnRef = useRef(false);
    const prevDateRef = useRef<string | null>(null);

    return (
        <ChatContainer className={className} messages={messagesForActiveUser}>
            {messagesForActiveUser.map((message, index) => {
                const hasOwn = message.receiverId === activeUserId;

                const classNameMargin =
                    index !== 0 && hasOwn === hasPrevOwnRef.current
                        ? styles['message_self']
                        : styles['message_group'];

                hasPrevOwnRef.current = hasOwn;

                const msgDate = new Date(message.timestamp);
                const msgDateKey = msgDate.toISOString().split('T')[0];
                const showDateDivider = prevDateRef.current !== msgDateKey;

                if (showDateDivider) {
                    prevDateRef.current = msgDateKey;
                }

                return (
                    <Fragment key={message.id}>
                        {showDateDivider && (
                            <div className={styles['date']}>
                                {getFormattedTime(msgDate, true)}
                            </div>
                        )}
                        <Message
                            className={classNames(classNameMargin, {
                                [styles['message_active']]: hasOwn,
                            })}
                            attachments={message.attachments}
                            hasOwn={message.receiverId === activeUserId}
                            status={message.status}
                            text={message.text}
                            timestamp={message.timestamp}
                        />
                    </Fragment>
                );
            })}
        </ChatContainer>
    );
}

export default observer(Messages);
