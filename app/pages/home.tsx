import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { chatStore } from '~/shared/store/ChatStore';
import Chat from '~/widgets/Chat/Chat';
import Sidebar from '~/widgets/Sidebar/Sidebar';
import styles from './home.module.scss';

function Home() {
    const users = chatStore.users;

    useEffect(() => {
        if (users.length === 0) {
            chatStore.initUsers();
        }
    });

    return (
        <div className={styles['home']}>
            {users.length === 0 ? (
                <div>{'LOADER'}</div>
            ) : (
                <>
                    <Sidebar className={styles['home__sidebar']} />
                    <Chat className={styles['home__chat']} />
                </>
            )}
        </div>
    );
}

export default observer(Home);
