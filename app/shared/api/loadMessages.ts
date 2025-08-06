import { MOCK_MASSAGES } from '../mock/mock-messages';
import { MOCK_USERS } from '../mock/mock-users';
import type { MessageType } from '../types/message';

const now = Date.now();

function getMessages(): Record<string, MessageType[]> {
    const result: Record<string, MessageType[]> = {};

    Object.values(MOCK_USERS).forEach((user) => {
        result[user.id] = Array.from({ length: 120 }, (_, index) => {
            const original = MOCK_MASSAGES[index % MOCK_MASSAGES.length];

            return {
                ...original,
                ...(original.text
                    ? { text: `[To user ${user.id}] ${original.text}` }
                    : {}),
                senderId:
                    original.senderId === '' ? user.id : original.senderId,
                receiverId:
                    original.receiverId === '' ? user.id : original.receiverId,
                id: `msg-${index + 1}`,
                timestamp: new Date(now - index * 60_000 * 60 * 5), // 5 hours
            };
        });
    });

    return result;
}

const mockMessages = getMessages();

// Load messages imitation
export function loadMessages({
    offset,
    limit,
    userId,
}: {
    offset: number;
    limit: number;
    userId: string;
}): Promise<MessageType[]> {
    return new Promise((resolve) => {
        const messages = mockMessages[userId] || [];

        setTimeout(() => {
            const total = messages.length;
            const start = Math.max(total - offset - limit, 0);
            const end = total - offset;
            const page = messages.slice(start, end);

            resolve(page);
        }, 500);
    });
}
