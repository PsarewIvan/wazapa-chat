import { memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Sidebar.module.scss';

type Props = {
    activeId: string;
    images: {
        id: string;
        url: string;
        name?: string;
        size?: number;
    }[];
    onImageChange: (id: string) => void;
};

function Sidebar({ activeId, images, onImageChange }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const index = Number(activeId);

        if (itemRefs.current[index] && containerRef.current) {
            const container = containerRef.current;
            const item = itemRefs.current[index];

            const containerHeight = container.clientHeight;
            const itemHeight = item.clientHeight;

            const scrollTop =
                item.offsetTop - containerHeight / 2 + itemHeight / 2;

            container.scrollTo({
                top: scrollTop,
                behavior: 'smooth',
            });
        }
    }, [activeId]);

    return (
        <div className={styles['sidebar']} ref={containerRef}>
            {images.map((image, index) => (
                <div
                    className={classNames(styles['sidebar__img-wrapper'], {
                        [styles['sidebar__img-wrapper_active']]:
                            image.id === activeId,
                    })}
                    ref={(el) => {
                        if (el) {
                            itemRefs.current[index] = el;
                        }
                    }}
                    key={image.id}
                    onClick={() => {
                        onImageChange(image.id);
                    }}
                >
                    <img className={styles['sidebar__img']} src={image.url} />
                </div>
            ))}
        </div>
    );
}

export default memo(Sidebar);
