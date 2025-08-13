import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import CaretLeft from '~/shared/icons/CaretLeft';
import Button from '~/shared/ui/Button/Button';
import styles from './ImagesView.module.scss';
import ChatHeader from '../ChatHeader/ChatHeader';

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
};

function ImagesView({ activeId, images, text, onClose }: Props) {
    const [previewImage, setPreviewImage] = useState(
        images.find((image) => image.id === activeId) ?? null
    );

    const handleBackClick = useCallback(() => {
        setPreviewImage((prevValue) => {
            const currentIndex = images.findIndex(
                (image) => image.id === prevValue?.id
            );

            if (currentIndex === 0) {
                return images[images.length - 1];
            }

            return images[currentIndex - 1];
        });
    }, [images]);

    const handleForwardClick = useCallback(() => {
        setPreviewImage((prevValue) => {
            const currentIndex = images.findIndex(
                (image) => image.id === prevValue?.id
            );

            if (currentIndex === images.length - 1) {
                return images[0];
            }

            return images[currentIndex + 1];
        });
    }, [images]);

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
                <div className={styles['view__sidebar']}>
                    {images.map((image) => (
                        <div
                            className={classNames(
                                styles['view__sidebar-img-wrapper'],
                                {
                                    [styles[
                                        'view__sidebar-img-wrapper_active'
                                    ]]: image.id === previewImage?.id,
                                }
                            )}
                            key={image.id}
                        >
                            <img
                                className={styles['view__sidebar-img']}
                                src={image.url}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(ImagesView);
