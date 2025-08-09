import { useCallback, useMemo, useState } from 'react';
import { useWindowSize } from '~/shared/hooks/useWindowSize';

type UsePositionHookResult = {
    position: {
        top: number;
        left: number;
        isLeft: boolean;
    };
    updatePosition: () => void;
};

const SUB_MENU_WIDTH = 260;

export function useSubMenuPosition(
    button: HTMLButtonElement | null
): UsePositionHookResult {
    const windowSize = useWindowSize();
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        isLeft: false,
    });

    const updatePosition = useCallback(() => {
        if (button) {
            const { top, left, width } = button.getBoundingClientRect();
            const isLeft = left + width + SUB_MENU_WIDTH > windowSize.width;
            const posX = isLeft
                ? Math.round(left - SUB_MENU_WIDTH)
                : Math.round(left + width);

            setPosition({ top, left: posX, isLeft });
        }
    }, [button, windowSize.width]);

    return useMemo(
        () => ({
            position,
            updatePosition,
        }),
        [position, updatePosition]
    );
}
