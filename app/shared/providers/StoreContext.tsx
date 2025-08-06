import { createContext, useContext } from 'react';
import { chatStore, type ChatStore } from '../store/ChatStore';

export class RootStore {
    chatStore: ChatStore = chatStore;
}

export const StoreContext = createContext<RootStore>(new RootStore());

export const useStore = () => useContext(StoreContext).chatStore;
