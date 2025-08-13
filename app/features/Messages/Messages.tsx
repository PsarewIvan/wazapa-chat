import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useStore } from '~/shared/providers/StoreContext';
import Message from '~/shared/ui/Message/Message';
import ChatContainer from '~/shared/ui/ChatContainer/ChatContainer';
import styles from './Messages.module.scss';

type Props = {
    className?: string;
};

function Messages({ className }: Props) {
    const { activeUserId, messagesForActiveUser } = useStore();

    const hasPrevOwnRef = useRef(false);

    return (
        <ChatContainer className={className} messages={messagesForActiveUser}>
            {messagesForActiveUser.map((message, index) => {
                const hasOwn = message.receiverId === activeUserId;

                const classNameMargin =
                    index !== 0 && hasOwn === hasPrevOwnRef.current
                        ? styles['message_self']
                        : styles['message_group'];

                hasPrevOwnRef.current = hasOwn;
                return (
                    <Message
                        className={classNames(classNameMargin, {
                            [styles['message_active']]: hasOwn,
                        })}
                        key={message.id}
                        attachments={message.attachments}
                        hasOwn={message.receiverId === activeUserId}
                        status={message.status}
                        text={message.text}
                        timestamp={message.timestamp}
                    />
                );
            })}
        </ChatContainer>
    );
}

export default observer(Messages);
