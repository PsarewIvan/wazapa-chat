import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import ChatHeader from '~/features/ChatHeader/ChatHeader';
import Messages from '~/features/Messages/Messages';
import EmptyChat from '~/shared/ui/EmptyChat/EmptyChat';
import { useStore } from '~/shared/providers/StoreContext';
import styles from './Chat.module.scss';

type Props = {
    className?: string;
};

function Chat({ className }: Props) {
    const { activeUserId } = useStore();

    return (
        <div className={classNames(styles['chat'], className)}>
            {activeUserId ? (
                <>
                    <ChatHeader />
                    <Messages />
                </>
            ) : (
                <EmptyChat className={styles['chat__empty']} />
            )}
        </div>
    );
}

export default observer(Chat);
