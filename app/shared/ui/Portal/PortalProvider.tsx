import { type ReactNode, type RefObject, createContext } from 'react';

export const PortalContext = createContext<React.RefObject<HTMLElement | null>>(
    {
        current: null,
    }
);

type Props = {
    children?: ReactNode;
    container: RefObject<HTMLElement>;
};

export function PortalProvider({ container, children }: Props) {
    return (
        <PortalContext.Provider value={container}>
            {children}
        </PortalContext.Provider>
    );
}
