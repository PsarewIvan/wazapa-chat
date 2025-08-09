import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePortalContainer } from './usePortalContainer';

type Props = {
    children?: ReactNode;
    container?: Element;
    disablePortal?: boolean;
};

export function Portal({ children, container, disablePortal }: Props) {
    const defaultContainer = usePortalContainer();

    const containerNode = container ?? defaultContainer;

    if (disablePortal) {
        return <>{children}</>;
    }

    if (containerNode) {
        return createPortal(children, containerNode);
    }

    return null;
}
