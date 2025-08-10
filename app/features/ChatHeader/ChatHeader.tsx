import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/shared/providers/StoreContext';
import Avatar from '~/shared/ui/Avatar/Avatar';
import styles from './ChatHeader.module.scss';
import Button from '~/shared/ui/Button/Button';
import CrossIcon from '~/shared/icons/CrossIcon';

type Props = {
    className?: string;
    theme?: 'dark' | 'light';
    onClose?: () => void;
};

function ChatHeader({ className, theme = 'light', onClose }: Props) {
    const { activeUser } = useStore();

    if (!activeUser) {
        return null;
    }

    return (
        <div
            className={classNames(
                styles['header'],
                styles[`header_${theme}`],
                className
            )}
        >
            <Avatar
                className={styles['header__avatar']}
                messenger={activeUser.messenger}
                theme={theme}
                url={activeUser.avatarSrc ?? ''}
            />
            <div className={styles['header__info']}>
                <div className={styles['header__name']}>{activeUser.name}</div>
                <div className={styles['header__phone']}>
                    {activeUser.phone}
                </div>
            </div>
            {onClose && (
                <Button className={styles['header__close']} onClick={onClose}>
                    <CrossIcon className={styles['header__close-icon']} />
                </Button>
            )}
        </div>
    );
}

export default observer(ChatHeader);
