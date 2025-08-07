import { makeAutoObservable, runInAction } from 'mobx';
import type { UserType } from '../types/user';
import { loadMessages } from '../api/loadMessages';
import { loadUsers } from '../api/loadUsers';
import type { UserChatType } from './types';

export class ChatStore {
    activeUserId: string | null = null;
    chats: Map<string, UserChatType> = new Map();
    users: UserType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setActiveUser = (userId: string) => {
        runInAction(() => {
            this.activeUserId = userId;
        });
    };

    initUsers = async () => {
        // имитация API запроса
        const users = await loadUsers();

        runInAction(() => {
            this.users = users;
        });

        users.forEach((user) => {
            this.getMessages(user.id);
        });
    };

    getMessages = async (userId: string) => {
        let chat = this.chats.get(userId);

        if (!chat) {
            this.chats.set(userId, { loading: false, messages: [] });
            chat = this.chats.get(userId);
        }

        if (!chat || chat.loading) return;

        chat.loading = true;

        const existing = this.chats.get(userId);

        if (!existing) return;

        // имитация API запроса
        const messages = await loadMessages({
            userId,
        });

        runInAction(() => {
            existing.messages = [...messages, ...existing.messages];
            existing.loading = false;
        });
    };

    get messagesForActiveUser() {
        if (!this.activeUserId) return [];

        return this.chats.get(this.activeUserId)?.messages ?? [];
    }

    get activeUser(): UserType | null {
        if (!this.activeUserId) return null;

        return this.users.find((user) => user.id === this.activeUserId) ?? null;
    }
}

export const chatStore = new ChatStore();
