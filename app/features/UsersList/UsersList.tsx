import { observer } from 'mobx-react-lite';
import { chatStore } from '~/shared/store/ChatStore';
import UserItem from '../UserItem/UserItem';
import styles from './UsersList.module.scss';

function UsersList() {
    const users = chatStore.users;

    return (
        <div className={styles['users-list']}>
            {users.map((user) => (
                <UserItem
                    id={user.id}
                    name={user.name}
                    avatarUrl={user.avatarSrc}
                    messenger={user.messenger}
                    key={user.id}
                />
            ))}
        </div>
    );
}

export default observer(UsersList);
