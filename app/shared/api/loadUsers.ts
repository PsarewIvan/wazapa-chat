import { MOCK_USERS } from '../mock/mock-users';
import type { UserType } from '../types/user';

// Load users imitation
export function loadUsers({
    offset,
    limit,
}: {
    offset: number;
    limit: number;
}): Promise<UserType[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const total = MOCK_USERS.length;
            const start = Math.max(total - offset - limit, 0);
            const end = total - offset;
            const page = MOCK_USERS.slice(start, end);

            resolve(page);
        }, 500);
    });
}
