import { useLayoutEffect, useState } from 'react';
import throttle from 'lodash.throttle';

export function useWindowSize(
    { throttleMs }: { throttleMs?: number } = { throttleMs: 100 }
): { width: number; height: number } {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useLayoutEffect(() => {
        const handleResize = throttle(() => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }, throttleMs);
        window.addEventListener('resize', handleResize);
        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    }, [throttleMs]);
    return { width, height };
}
