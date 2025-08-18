import { memo, useCallback } from 'react';
import CaretLeft from '~/shared/icons/CaretLeft';
import Button from '~/shared/ui/Button/Button';
import ChatHeader from '../ChatHeader/ChatHeader';
import Sidebar from './Sidebar';
import styles from './ImagesView.module.scss';

type Props = {
    activeId: string;
    images: {
        id: string;
        url: string;
        name?: string;
        size?: number;
    }[];
    text?: string;
    onClose: () => void;
    onImageChange: (id: string) => void;
};

function ImagesView({ activeId, images, text, onClose, onImageChange }: Props) {
    const previewImage = images.find((image) => image.id === activeId) ?? null;

    const handleBackClick = useCallback(() => {
        const currentIndex = images.findIndex((image) => image.id === activeId);

        if (currentIndex === 0) {
            onImageChange(images[images.length - 1].id);
        } else {
            onImageChange(images[currentIndex - 1].id);
        }
    }, [activeId, images, onImageChange]);

    const handleForwardClick = useCallback(() => {
        const currentIndex = images.findIndex((image) => image.id === activeId);

        if (currentIndex === images.length - 1) {
            onImageChange(images[0].id);
        } else {
            onImageChange(images[currentIndex + 1].id);
        }
    }, [activeId, images, onImageChange]);

    return (
        <div className={styles['view']}>
            <ChatHeader theme="dark" onClose={onClose} />
            <div className={styles['view__content']}>
                <div className={styles['view__preview']}>
                    <Button
                        className={styles['view__back']}
                        onClick={handleBackClick}
                    >
                        <CaretLeft className={styles['view__back-icon']} />
                    </Button>
                    <img
                        className={styles['view__preview-img']}
                        src={previewImage?.url}
                    />
                    <Button
                        className={styles['view__forward']}
                        onClick={handleForwardClick}
                    >
                        <CaretLeft className={styles['view__forward-icon']} />
                    </Button>
                    {text && (
                        <div className={styles['view__message']}>
                            <div className={styles['view__message-text']}>
                                {text}
                            </div>
                        </div>
                    )}
                </div>
                <Sidebar
                    activeId={activeId}
                    images={images}
                    onImageChange={onImageChange}
                />
            </div>
        </div>
    );
}

export default memo(ImagesView);
