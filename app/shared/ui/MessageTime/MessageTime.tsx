import { memo } from 'react';
import styles from './MessageTime.module.scss';

type Props = {
    time: Date;
};

function MessageTime({ time }: Props) {
    return <div>MessageTime</div>;
}

export default memo(MessageTime);
