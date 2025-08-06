import { memo, useCallback, useState } from 'react';
import SearchField from '~/shared/ui/SearchField/SearchField';
import UsersList from '../UsersList/UsersList';
import { TEXT } from './constants';
import styles from './SidebarContent.module.scss';

function SidebarContent() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    return (
        <>
            <SearchField
                className={styles['content__search']}
                name="user-search"
                placeholder={TEXT.SearchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
            />
            <div className={styles['content__users']}>
                <UsersList />
            </div>
        </>
    );
}

export default memo(SidebarContent);
