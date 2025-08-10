import { memo } from 'react';
import classNames from 'classnames';
import Audio from './Audio';
import styles from './MessageAudio.module.scss';

type Props = {
    audios: {
        url: string;
        name?: string;
        size?: number;
    }[];
};

function MessageAudio({ audios }: Props) {
    return (
        <div className={classNames(styles['audios'])}>
            {audios.map((audio, index) => (
                <Audio
                    key={`${audio.name}${audio.size}${index}`}
                    src={audio.url}
                />
            ))}
        </div>
    );
}

export default memo(MessageAudio);
