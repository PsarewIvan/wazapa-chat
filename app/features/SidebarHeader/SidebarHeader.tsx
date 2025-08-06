import { memo } from 'react';
import Logo from '~/shared/ui/Logo/Logo';
import Button from '~/shared/ui/Button/Button';
import ThreeDots from '~/shared/icons/ThreeDots';
import styles from './SidebarHeader.module.scss';

function SidebarHeader() {
    return (
        <div className={styles['header']}>
            <Logo />
            <Button>
                <ThreeDots className={styles['button__icon']} />
            </Button>
        </div>
    );
}

export default memo(SidebarHeader);
