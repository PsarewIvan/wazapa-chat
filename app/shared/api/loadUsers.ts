import { MOCK_USERS } from '../mock/mock-users';
import type { UserType } from '../types/user';

// Load users imitation
export function loadUsers(): Promise<UserType[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_USERS);
        }, 500);
    });
}
