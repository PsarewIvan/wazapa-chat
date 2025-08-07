import { memo } from 'react';
import classNames from 'classnames';
import styles from './EmptyChat.module.scss';

type Props = {
    className?: string;
};

function EmptyChat({ className }: Props) {
    return (
        <div className={classNames(styles['wrapper'], className)}>
            {'Выберите, кому хотите написать'}
        </div>
    );
}

export default memo(EmptyChat);
