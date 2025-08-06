import { memo } from 'react';
import classNames from 'classnames';
import SidebarContent from '~/features/SidebarContent/SidebarContent';
import SidebarHeader from '~/features/SidebarHeader/SidebarHeader';
import styles from './Sidebar.module.scss';

type Props = {
    className?: string;
};

function Sidebar({ className }: Props) {
    return (
        <div className={classNames(className, styles['sidebar'])}>
            <SidebarHeader />
            <SidebarContent />
        </div>
    );
}

export default memo(Sidebar);
