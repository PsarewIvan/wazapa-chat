import { memo } from 'react';
import classNames from 'classnames';
import styles from './MessageImages.module.scss';

type Props = {
    images: {
        url: string;
        name?: string;
        size?: number;
    }[];
};

function MessageImages({ images }: Props) {
    const previewImages = images.slice(0, 3);
    const remainingCount = images.length - 3;

    return (
        <div
            className={classNames(styles['images'])}
            style={{
                gridTemplateColumns: `repeat(${images.length > 3 ? 3 : images.length}, 1fr)`,
            }}
        >
            {previewImages.map((image, index) => (
                <div key={index} className={styles['images__wrapper']}>
                    <img className={styles['images__img']} src={image.url} />
                    {index === 2 && remainingCount > 0 && (
                        <div className={styles['images__overlay']}>
                            +{remainingCount}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default memo(MessageImages);
