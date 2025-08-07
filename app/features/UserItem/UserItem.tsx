import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import type { MessengerType } from '~/shared/types/user';
import type { MessageType } from '~/shared/types/message';
import { getFormattedTime } from '~/shared/helpers/getFormattedTime';
import Avatar from '~/shared/ui/Avatar/Avatar';
import MessageStatus from '~/shared/ui/MessageStatus/MessageStatus';
import UserInfo from '~/shared/ui/UserInfo/UserInfo';
import { useStore } from '~/shared/providers/StoreContext';
import styles from './UserItem.module.scss';

type Props = {
    name: string;
    id: string;
    avatarUrl?: string;
    messenger: MessengerType;
    unreadCount?: number;
};

function UserItem({ avatarUrl, name, id, messenger, unreadCount }: Props) {
    const { chats, setActiveUser, activeUserId } = useStore();

    const messages = chats.get(id)?.messages ?? [];
    const lastMessage =
        messages.length > 0 ? messages[messages.length - 1] : undefined;

    const hasActive = id === activeUserId;

    function handleItemClick() {
        setActiveUser(id);
    }

    return (
        <button
            className={classNames(styles['user-item'], {
                [styles['user-item_active']]: hasActive,
            })}
            type="button"
            onClick={handleItemClick}
        >
            <Avatar
                className={styles['user-item__avatar']}
                messenger={messenger}
                url={avatarUrl ?? null}
            />
            <UserInfo
                className={styles['user-item__info']}
                name={name}
                lastMessage={lastMessage}
            />
            {lastMessage && (
                <div className={styles['user-item__message-info']}>
                    <div className={styles['user-item__time']}>
                        {getFormattedTime(lastMessage.timestamp)}
                    </div>
                    {unreadCount ? (
                        <div
                            className={classNames(
                                styles['user-item__unread-count'],
                                {
                                    [styles['user-item__unread-count_thin']]:
                                        unreadCount > 999,
                                }
                            )}
                        >
                            {unreadCount}
                        </div>
                    ) : (
                        <MessageStatus
                            className={styles['user-item__status']}
                            status={lastMessage.status}
                        />
                    )}
                </div>
            )}
        </button>
    );
}

export default observer(UserItem);
