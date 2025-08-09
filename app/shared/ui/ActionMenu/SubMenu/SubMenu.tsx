import {
    type ForwardRefExoticComponent,
    type ReactNode,
    type RefAttributes,
    type SVGProps,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import Item from '../Item/Item';
import { type ActionSubMenuItemType } from '../types.js';
import { Portal } from '../../Portal/Portal';
import { useSubMenuPosition } from './useSubMenuPosition';
import styles from './SubMenu.module.scss';

type Props = {
    dataKey: string;
    label: ReactNode;
    icon?: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
    >;
    subItems: ActionSubMenuItemType[];
    classNameIcon?: string;
};

const DELAY_TIMEOUT = 100;

const SubMenu = forwardRef<HTMLDivElement, Props>(function SubMenu(
    { dataKey, label, icon, subItems, classNameIcon },
    ref
) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const timer = useRef(0);
    const {
        position: { isLeft, ...style },
        updatePosition,
    } = useSubMenuPosition(buttonRef.current);

    const handleClickItem = useCallback(
        ({ onClick }: ActionSubMenuItemType) => {
            return (): void => {
                if (onClick) {
                    onClick(dataKey);
                }

                setIsOpen(false);
            };
        },
        [dataKey]
    );

    const resetTimeout = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    function handleShowMenu(): void {
        setIsOpen(true);
    }

    function handleHideMenu(): void {
        timer.current = window.setTimeout(
            () => setIsOpen(false),
            DELAY_TIMEOUT
        );
    }

    // const arrowIcon = (
    //     <ChevronDownIcon className={cn(arrowBlock({ left: isLeft }))} />
    // );

    useEffect(() => {
        resetTimeout();
        updatePosition();
    }, [resetTimeout, updatePosition]);

    return (
        <>
            <Item
                ref={buttonRef}
                // addonAfter={arrowIcon}
                classNameIcon={classNameIcon}
                dataKey={dataKey}
                icon={icon}
                label={label}
                onBlur={handleHideMenu}
                onFocus={handleShowMenu}
                onMouseLeave={handleHideMenu}
                onMouseOver={handleShowMenu}
            />
            {isOpen && buttonRef.current && (
                <Portal>
                    <div
                        ref={ref}
                        className={classNames(styles['sub-items'], {
                            [styles['sub-items_left']]: isLeft,
                        })}
                        style={style}
                        onFocus={resetTimeout}
                        onMouseLeave={handleHideMenu}
                        onMouseOver={resetTimeout}
                    >
                        {subItems.map((item) => (
                            <Item
                                key={item.key}
                                className={item.className}
                                classNameIcon={item.classNameIcon}
                                dataKey={item.key}
                                disabled={item.disabled}
                                icon={item.icon}
                                label={item.label}
                                onClick={handleClickItem(item)}
                            />
                        ))}
                    </div>
                </Portal>
            )}
        </>
    );
});

export default memo(SubMenu);
