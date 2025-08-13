import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import ImagesView from '../../ImagesView/ImagesView';
import styles from './MessageImages.module.scss';

type Props = {
    images: {
        id: string;
        url: string;
        name?: string;
        size?: number;
    }[];
    text?: string;
};

function MessageImages({ images, text }: Props) {
    const [previewId, setPreviewId] = useState<string | null>(null);

    const previewImages = images.slice(0, 3);
    const remainingCount = images.length - 3;

    const handlePreviewClose = useCallback(() => {
        setPreviewId(null);
    }, []);

    const handlePreviewOpen = useCallback((id: string) => {
        return () => setPreviewId(id);
    }, []);

    return (
        <>
            <div
                className={classNames(styles['images'])}
                style={{
                    gridTemplateColumns: `repeat(${images.length > 3 ? 3 : images.length}, 1fr)`,
                }}
            >
                {previewImages.map((image, index) => (
                    <div
                        key={image.id}
                        className={styles['images__wrapper']}
                        onClick={handlePreviewOpen(image.id)}
                    >
                        <img
                            className={styles['images__img']}
                            src={image.url}
                        />
                        {index === 2 && remainingCount > 0 && (
                            <div className={styles['images__overlay']}>
                                +{remainingCount}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {previewId && (
                <ImagesView
                    activeId={previewId}
                    images={images}
                    text={text}
                    onClose={handlePreviewClose}
                />
            )}
        </>
    );
}

export default memo(MessageImages);
