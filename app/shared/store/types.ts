import type { MessageType } from '../types/message';

export type UserChatType = {
    loading: boolean;
    messages: MessageType[];
};
