import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import ChatInput from '~/features/ChatInput/ChatInput';
import Messages from '~/features/Messages/Messages';
import ChatHeader from '~/shared/ui/ChatHeader/ChatHeader';
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
                    <ChatHeader className={styles['chat__header']} />
                    <Messages className={styles['chat__content']} />
                    <ChatInput className={styles['chat__footer']} />
                </>
            ) : (
                <EmptyChat className={styles['chat__empty']} />
            )}
        </div>
    );
}

export default observer(Chat);
