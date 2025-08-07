import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/shared/providers/StoreContext';
import Avatar from '~/shared/ui/Avatar/Avatar';
import styles from './ChatHeader.module.scss';

type Props = {
    className?: string;
};

function ChatHeader({ className }: Props) {
    const { activeUser } = useStore();

    if (!activeUser) {
        return null;
    }

    return (
        <div className={classNames(styles['header'], className)}>
            <Avatar
                className={styles['header__avatar']}
                messenger={activeUser.messenger}
                url={activeUser.avatarSrc ?? ''}
            />
            <div className={styles['header__info']}>
                <div className={styles['header__name']}>{activeUser.name}</div>
                <div className={styles['header__phone']}>
                    {activeUser.phone}
                </div>
            </div>
        </div>
    );
}

export default observer(ChatHeader);
