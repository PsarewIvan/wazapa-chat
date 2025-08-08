import classNames from 'classnames';
import {
    forwardRef,
    type MouseEvent,
    type PropsWithChildren,
    type ReactNode,
    type Ref,
} from 'react';
import styles from './Menu.module.scss';

type BaseProps = {
    className?: string;
    children: ReactNode;
    onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Menu = forwardRef(
    (
        { className, children, onMouseDown }: PropsWithChildren<BaseProps>,
        ref: Ref<HTMLDivElement>
    ) => (
        <div
            data-test-id="menu"
            ref={ref}
            className={classNames(styles['menu'], className)}
            onMouseDown={onMouseDown}
        >
            {children}
        </div>
    )
);
