import type { MessageType } from './message';

export type MessengerType =
    | 'whatsapp'
    | 'telegram'
    | 'viber'
    | 'max'
    | 'vk'
    | 'other';

export type UserType = {
    id: string;
    name: string;
    messenger: MessengerType;
    phone?: string;
    avatarSrc?: string;
    lastMessage?: MessageType;
    unreadCount?: number;
};
