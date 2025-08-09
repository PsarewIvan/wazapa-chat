import { type ReactNode, memo } from 'react';
import styles from './Group.module.scss';

type Props = {
    children: ReactNode;
};

function Group({ children }: Props) {
    return (
        <>
            {children}
            <hr className={styles['separator']} />
        </>
    );
}

export default memo(Group);
