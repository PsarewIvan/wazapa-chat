import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import type { MessageType } from '~/shared/types/message';
import styles from './ChatContainer.module.scss';

type Props = {
    children: ReactNode;
    messages: MessageType[];
};

const ChatContainer = ({ children, messages }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const el = containerRef.current;

        if (el) {
            el.scrollTop = el.scrollHeight;
            setIsReady(true);
        }
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const el = containerRef.current;
        const images = el?.querySelectorAll('img') || [];

        let loadedCount = 0;

        const onLoad = () => {
            loadedCount++;

            if (el && loadedCount === images.length) {
                el.scrollTop = el.scrollHeight;
            }
        };

        images.forEach((img) => {
            if (img.complete) {
                onLoad();
            } else {
                img.addEventListener('load', onLoad);
                img.addEventListener('error', onLoad);
            }
        });

        return () => {
            images.forEach((img) => {
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onLoad);
            });
        };
    }, [messages, isReady]);

    return (
        <div className={styles['container']} ref={containerRef}>
            {children}
        </div>
    );
};

export default memo(ChatContainer);
