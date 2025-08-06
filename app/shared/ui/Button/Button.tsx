import { memo, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type Props = {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
};

function Button({ className, children, onClick }: Props) {
    return (
        <button
            className={classNames(styles['button'], className)}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default memo(Button);
