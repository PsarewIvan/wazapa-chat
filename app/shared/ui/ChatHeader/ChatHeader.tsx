import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/shared/providers/StoreContext';
import Avatar from '~/shared/ui/Avatar/Avatar';
import Button from '~/shared/ui/Button/Button';
import CrossIcon from '~/shared/icons/CrossIcon';
import ArrowLeftIcon from '~/shared/icons/ArrowLeftIcon';
import styles from './ChatHeader.module.scss';
import { useCallback } from 'react';

type Props = {
    className?: string;
    theme?: 'dark' | 'light';
    onClose?: () => void;
};

function ChatHeader({ className, theme = 'light', onClose }: Props) {
    const { activeUser, setActiveUser } = useStore();

    const handleBackClick = useCallback(() => {
        setActiveUser(null);
    }, []);

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
            {!onClose && (
                <Button
                    className={styles['header__back-button']}
                    onClick={handleBackClick}
                >
                    <ArrowLeftIcon className={styles['header__back-icon']} />
                </Button>
            )}
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
