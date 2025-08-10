import { memo } from 'react';
import classNames from 'classnames';
import DownloadIcon from '~/shared/icons/DownloadIcon';
import { getKbFromBytes } from '~/shared/helpers/getKbFromBytes';
import styles from './MessageFiles.module.scss';

type Props = {
    files: {
        url: string;
        name?: string;
        size?: number;
    }[];
};

function MessageFiles({ files }: Props) {
    return (
        <div className={classNames(styles['files'])}>
            {files.map((file, index) => (
                <div
                    key={`${file.name}${file.size}${index}`}
                    className={styles['files__wrapper']}
                >
                    <a
                        className={styles['files__link-button']}
                        href={file.url}
                        download
                    >
                        <DownloadIcon className={styles['files__file-icon']} />
                    </a>
                    <div className={styles['files__info']}>
                        <a
                            className={styles['files__name']}
                            href={file.url}
                            download
                        >
                            {file.name}
                        </a>
                        {file.size && (
                            <div
                                className={styles['files__size']}
                            >{`${getKbFromBytes(file.size)} Кб`}</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(MessageFiles);
