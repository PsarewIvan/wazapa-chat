import { type ReactNode, forwardRef, memo } from 'react';
import { mergeRefs } from 'react-merge-refs';
import classNames from 'classnames';
import { useFocus } from '~/shared/hooks/useFocus';
import { type ActionMenuItemType } from '../types';
import styles from './Item.module.scss';

type Props = Omit<ActionMenuItemType, 'key' | 'onClick' | 'value'> & {
    dataKey: string;
    addonAfter?: ReactNode;
    onClick?: () => void;
    onMouseOver?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onMouseLeave?: () => void;
};

const Item = forwardRef<HTMLButtonElement, Props>(function Item(
    {
        className,
        classNameIcon,
        dataKey,
        disabled,
        icon,
        label,
        onClick,
        onMouseOver,
        onFocus,
        onBlur,
        onMouseLeave,
        addonAfter,
    },
    ref
) {
    const [itemRef, focused] = useFocus<HTMLButtonElement>('keyboard');

    const Icon = icon;

    return (
        <li className={styles['list-item']}>
            <button
                ref={mergeRefs([ref, itemRef])}
                className={classNames(
                    styles['item'],
                    {
                        [styles['item_focus']]: focused,
                        [styles['item_icon']]: Boolean(icon),
                        [styles['item_disabled']]: disabled,
                    },
                    className
                )}
                data-key={dataKey}
                disabled={disabled}
                type="button"
                onBlur={onBlur}
                onClick={onClick}
                onFocus={onFocus}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {Icon && (
                    <div className={styles['item__icon']}>
                        <Icon
                            className={classNames(
                                styles['icon'],
                                {
                                    [styles['icon_disabled']]: disabled,
                                },
                                classNameIcon
                            )}
                        />
                    </div>
                )}
                <div className={styles['item__label']}>{label}</div>
                {addonAfter}
            </button>
        </li>
    );
});

export default memo(Item);
