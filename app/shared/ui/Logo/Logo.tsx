import { memo } from 'react';
import LogoIcon from '~/shared/icons/LogoIcon';
import LogoText from '~/shared/icons/LogoText';
import styles from './Logo.module.scss';

function Logo() {
    return (
        <div className={styles['logo']}>
            <LogoIcon />
            <LogoText />
        </div>
    );
}

export default memo(Logo);
