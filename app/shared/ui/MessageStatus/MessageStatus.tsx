import { memo } from 'react';
import classNames from 'classnames';
import type { MessageStatusType } from '~/shared/types/message';
import OneCheckIcon from '~/shared/icons/OneCheckIcon';
import TwoCheckIcon from '~/shared/icons/TwoCheckIcon';
import styles from './MessageStatus.module.scss';

type Props = {
    className?: string;
    status: MessageStatusType;
};

function MessageStatus({ className, status }: Props) {
    switch (status) {
        case 'sent':
            return (
                <OneCheckIcon
                    className={classNames(
                        styles['icon'],
                        styles['icon_default'],
                        className
                    )}
                />
            );
        case 'delivered':
            return (
                <TwoCheckIcon
                    className={classNames(
                        styles['icon'],
                        styles['icon_default'],
                        className
                    )}
                />
            );
        case 'read':
            return (
                <TwoCheckIcon
                    className={classNames(
                        styles['icon'],
                        styles['icon_active'],
                        className
                    )}
                />
            );
        case 'failed':
            // TODO: Add failed icon
            return <div>Error</div>;
        default:
            return null;
    }
}

export default memo(MessageStatus);
