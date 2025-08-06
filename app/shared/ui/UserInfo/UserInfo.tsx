import { memo } from 'react';
import type { MessageType } from '~/shared/types/message';
import styles from './UserInfo.module.scss';

type Props = {
    name: string;
    lastMessage?: MessageType;
};

function UserInfo({ name, lastMessage }: Props) {
    return (
        <div className={styles['info']}>
            <div className={styles['info__name']}>{name}</div>
            <div className={styles['info__message']}>
                {lastMessage?.text ?? ' '}
            </div>
        </div>
    );
}

export default memo(UserInfo);
