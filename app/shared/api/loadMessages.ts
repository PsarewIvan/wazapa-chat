import { MOCK_MASSAGES } from '../mock/mock-messages';
import { MOCK_USERS } from '../mock/mock-users';
import type { MessageType } from '../types/message';

const now = Date.now();

function getMessages(): Record<string, MessageType[]> {
    const result: Record<string, MessageType[]> = {};

    Object.values(MOCK_USERS).forEach((user, userIndex) => {
        result[user.id] = Array.from({ length: 30 }, (_, index) => {
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

        if (userIndex === 0) {
            result[user.id].push({
                id: '33333',
                timestamp: new Date(),
                text: 'Добрый день! Хочу записаться на маникюр на следующую неделю.',
                status: 'sent',
                senderId: 'user-1',
                receiverId: user.id,
            });
        }

        if (userIndex === 1) {
            result[user.id].push(
                {
                    id: '4444',
                    timestamp: new Date(),
                    text: 'Давай пятницу в 15:30! Надеюсь, успеем за час-полтора, у меня потом встреча 😅',
                    status: 'sent',
                    senderId: 'user-1',
                    receiverId: user.id,
                },
                {
                    id: '5555',
                    timestamp: new Date(),
                    text: 'Привет! Освободилось что-то на пятницу вечером?',
                    status: 'sent',
                    senderId: 'user-1',
                    receiverId: user.id,
                }
            );
        }

        if (userIndex === 2) {
            result[user.id].push({
                id: '666',
                timestamp: new Date(),
                text: 'Фото супер! Такой дизайн вполне можно сделать, и на твоей длине тоже будет смотреться стильно 🙌\nПятницу в 15:30 записала. Учти, что с дизайном может занять до 1ч 40 мин — но мы постараемся по максимуму уложиться.',
                status: 'sent',
                senderId: user.id,
                receiverId: 'user-1',
            });
        }

        if (userIndex === 3) {
            result[user.id].push({
                id: '666',
                timestamp: new Date(),
                text: 'Доброе утро! Напоминаю, сегодня у тебя в 16:00 окрашивание 💇‍♀️',
                status: 'delivered',
                senderId: user.id,
                receiverId: 'user-1',
            });
        }
    });

    return result;
}

const mockMessages = getMessages();

// Load messages imitation
export function loadMessages({
    userId,
}: {
    userId: string;
}): Promise<MessageType[]> {
    return new Promise((resolve) => {
        const messages = mockMessages[userId] || [];

        setTimeout(() => {
            resolve(messages);
        }, 500);
    });
}
