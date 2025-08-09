import { memo, useCallback, useRef, useState } from 'react';
import Logo from '~/shared/ui/Logo/Logo';
import Button from '~/shared/ui/Button/Button';
import ThreeDots from '~/shared/icons/ThreeDots';
import styles from './SidebarHeader.module.scss';
import ActionMenu from '~/shared/ui/ActionMenu/ActionMenu';
import { useActionItems } from './useActionItems';

function SidebarHeader() {
    const [isMenuShow, setIsMenuShow] = useState(false);

    const ref = useRef<HTMLButtonElement>(null);

    const actions = useActionItems();

    const handleMenuShown = useCallback(() => {
        console.log('[hasMenuShown]');
    }, []);

    const handleButtonMenuClick = useCallback(() => {
        setIsMenuShow((prev) => !prev);
    }, []);

    const handleMenuClose = useCallback(() => {
        setIsMenuShow(false);
    }, []);

    return (
        <div className={styles['header']}>
            <Logo />
            <Button
                active={isMenuShow}
                ref={ref}
                onClick={handleButtonMenuClick}
            >
                <ThreeDots className={styles['button__icon']} />
            </Button>
            {isMenuShow && (
                <ActionMenu
                    items={actions}
                    offset={[0, 4]}
                    position="bottom-start"
                    target={ref}
                    onClose={handleMenuClose}
                    onHidden={() => {}}
                    onShown={handleMenuShown}
                />
            )}
        </div>
    );
}

export default memo(SidebarHeader);
