import {
    type RefObject,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import { useClickOutside } from '~/shared/hooks/useClickOutside.js';
import {
    type ActionMenuGroupType,
    type ActionMenuItemType,
    type ActionMenuItemsType,
} from './types';
import Group from './Group/Group.js';
import styles from './ActionMenu.module.scss';
import Popover, { type TypePopoverPosition } from './Popover';
import Menu from './Menu/Menu';
import SubMenu from './SubMenu/SubMenu';
import Item from './Item/Item';

const ESCAPE = 27;

type Props = {
    className?: string;
    classNamePopover?: string;
    items: ActionMenuGroupType[];
    offset?: [number, number];
    portalContainer?: HTMLElement;
    position: TypePopoverPosition;
    target: RefObject<HTMLElement | null>;
    onClose: () => void;
    onHidden?: () => void;
    onShown?: () => void;
};

function ActionMenu({
    className,
    classNamePopover,
    // hasFlip = true,
    items,
    offset,
    portalContainer,
    position,
    // strategy,
    target,
    onClose,
    onHidden,
    onShown,
}: Props) {
    const menuRef = useRef<HTMLUListElement>(null);
    const subMenuRefs = useRef<Record<string, HTMLDivElement>>({});
    const [currentTarget, setCurrentTarget] = useState<HTMLElement>();

    useEffect(() => {
        if (target.current) {
            setCurrentTarget(target.current);
        }
    }, [target]);

    const isClickedInsideSubmenu = useCallback((node: Element): boolean => {
        return Object.values(subMenuRefs.current).some(
            (ref) => ref && ref.contains(node)
        );
    }, []);

    useClickOutside(menuRef, (event) => {
        function clickedOutside(node: Element): boolean {
            if (
                (currentTarget && currentTarget.contains(node)) ||
                isClickedInsideSubmenu(node)
            ) {
                return false;
            }

            return true;
        }

        const eventTarget = event.target as Element;

        if (clickedOutside(eventTarget)) {
            onClose();
        }
    });

    useEffect(() => {
        function handleKeyUp(event: KeyboardEvent): void {
            if (event.which === ESCAPE) {
                onClose();
            }
        }

        document.body.addEventListener('keyup', handleKeyUp);

        return (): void => {
            document.body.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleClickMenuItem = useCallback(
        ({
            onClick,
            key,
            value,
            hasCloseOnClick = true,
        }: ActionMenuItemType) => {
            return async (): Promise<void> => {
                await onClick(key, value);

                if (hasCloseOnClick) {
                    onClose();
                }
            };
        },
        [onClose]
    );

    const setRef = useCallback((key: string) => {
        return (el: HTMLDivElement | null): void => {
            if (el) {
                subMenuRefs.current[key] = el;
            }
        };
    }, []);

    if (currentTarget) {
        return (
            <Popover
                className={classNames(styles['popover'], classNamePopover)}
                hasFlipVariations={false}
                offset={offset}
                portalContainer={portalContainer}
                position={position}
                target={currentTarget}
                onHidden={onHidden}
                onShown={onShown}
            >
                <Menu ref={menuRef} className={className}>
                    {items
                        .filter((item) => !item.hidden)
                        .map((group: ActionMenuGroupType) => (
                            <Group key={group.key}>
                                {group.title && (
                                    <p className={styles['group-title']}>
                                        {group.title}
                                    </p>
                                )}
                                {group.items
                                    .filter((item) => !item.hidden)
                                    .map((item: ActionMenuItemsType) => {
                                        if ('subItems' in item) {
                                            return (
                                                <SubMenu
                                                    key={item.key}
                                                    ref={setRef(item.key)}
                                                    classNameIcon={
                                                        item.classNameIcon
                                                    }
                                                    dataKey={item.key}
                                                    icon={item.icon}
                                                    label={item.label}
                                                    subItems={item.subItems}
                                                />
                                            );
                                        }

                                        return (
                                            <Item
                                                key={item.key}
                                                className={item.className}
                                                classNameIcon={
                                                    item.classNameIcon
                                                }
                                                dataKey={item.key}
                                                disabled={item.disabled}
                                                icon={item.icon}
                                                label={item.label}
                                                onClick={handleClickMenuItem(
                                                    item
                                                )}
                                            />
                                        );
                                    })}
                            </Group>
                        ))}
                </Menu>
            </Popover>
        );
    }

    return null;
}

export default memo(ActionMenu);
