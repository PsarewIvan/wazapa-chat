import { memo } from 'react';
import styles from './ChatHeader.module.scss';

function ChatHeader() {
    return <div className={styles['header']}>{/* <Logo /> */}</div>;
}

export default memo(ChatHeader);
