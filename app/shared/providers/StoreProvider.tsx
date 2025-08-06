import type { ReactNode } from 'react';
import { RootStore, StoreContext } from './StoreContext';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const store = new RootStore();

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
