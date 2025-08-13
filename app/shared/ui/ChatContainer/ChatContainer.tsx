import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import classNames from 'classnames';
import type { MessageType } from '~/shared/types/message';
import CaretLeft from '~/shared/icons/CaretLeft';
import Button from '../Button/Button';
import styles from './ChatContainer.module.scss';

type Props = {
    className?: string;
    children: ReactNode;
    messages: MessageType[];
};

const ChatContainer = ({ className, children, messages }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isReady, setIsReady] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

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

    function handleScroll() {
        if (!containerRef.current) return;
        const el = containerRef.current;

        const distanceFromBottom =
            el.scrollHeight - (el.scrollTop + el.clientHeight);

        setShowScrollButton(distanceFromBottom > el.clientHeight / 2);
    }

    function handleScrollClick() {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    return (
        <div className={classNames(styles['wrapper'], className)}>
            <div
                className={styles['container']}
                ref={containerRef}
                onScroll={handleScroll}
            >
                {children}
            </div>
            <div
                className={classNames(styles['scroll-action'], {
                    [styles['scroll-action_showed']]: showScrollButton,
                })}
            >
                <Button onClick={handleScrollClick}>
                    <CaretLeft className={styles['scroll-action__icon']} />
                </Button>
            </div>
        </div>
    );
};

export default memo(ChatContainer);
