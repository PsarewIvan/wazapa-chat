import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Chat from '~/widgets/Chat/Chat';
import Sidebar from '~/widgets/Sidebar/Sidebar';
import styles from './home.module.scss';
import { useStore } from '~/shared/providers/StoreContext';

function Home() {
    const { activeUserId, users, initUsers } = useStore();

    useEffect(() => {
        if (users.length === 0) {
            initUsers();
        }
    });

    return (
        <div className={styles['home']}>
            {users.length === 0 ? (
                <div>{'LOADER'}</div>
            ) : (
                <>
                    <Sidebar className={styles['home__sidebar']} />
                    <Chat
                        className={classNames(styles['home__chat'], {
                            [styles['home__chat_active']]: activeUserId,
                        })}
                    />
                </>
            )}
        </div>
    );
}

export default observer(Home);
