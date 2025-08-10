import { memo } from 'react';
import classNames from 'classnames';
import type { MessengerType } from '~/shared/types/user';
import styles from './Avatar.module.scss';

const UNKNOWN_USER_ICON = '/images/unknown-user.png';
const MESSENGER_ICONS: Record<MessengerType, string> = {
    whatsapp: '/icons/wa.png',
    telegram: '/icons/tg.png',
    viber: '/icons/viber.png',
    max: '/icons/max.png',
    vk: '/icons/vk.png',
    other: '/icons/mayak.png',
};

type Props = {
    className?: string;
    messenger: MessengerType;
    theme?: 'dark' | 'light';
    url: string | null;
};

function Avatar({ className, messenger, theme = 'light', url }: Props) {
    return (
        <div
            className={classNames(
                styles['avatar'],
                styles[`avatar_${theme}`],
                className
            )}
        >
            <img
                className={classNames(styles['avatar__image'], {
                    [styles['avatar__image_unknown']]: !url,
                })}
                src={url ?? UNKNOWN_USER_ICON}
            />
            <div className={styles['avatar__messenger-wrapper']}>
                <img
                    className={styles['avatar__messenger']}
                    src={MESSENGER_ICONS[messenger]}
                />
            </div>
        </div>
    );
}

export default memo(Avatar);
