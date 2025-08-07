import { memo } from 'react';
import classNames from 'classnames';
import type { MessageType } from '~/shared/types/message';
import styles from './UserInfo.module.scss';

type Props = {
    className?: string;
    name: string;
    lastMessage?: MessageType;
};

function UserInfo({ className, name, lastMessage }: Props) {
    return (
        <div className={classNames(styles['info'], className)}>
            <div className={styles['info__name']}>{name}</div>
            <div className={styles['info__message']}>
                {lastMessage?.text ?? ' '}
            </div>
        </div>
    );
}

export default memo(UserInfo);
