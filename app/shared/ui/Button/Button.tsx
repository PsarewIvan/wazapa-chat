import { memo, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
    active?: boolean;
    className?: string;
    children: ReactNode;
    type?: 'primary';
    onClick?: () => void;
};

function Button({ active, className, children, type, onClick }: Props) {
    return (
        <button
            className={classNames(
                styles['button'],
                {
                    [styles['button_primary']]: type === 'primary',
                    [styles['button_active']]: active,
                },
                className
            )}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default memo(Button);
