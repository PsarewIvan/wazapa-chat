import { memo, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayIcon from '~/shared/icons/PlayIcon';
import styles from './Audio.module.scss';

type Props = {
    src: string;
};

function Audio({ src }: Props) {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');

    useEffect(() => {
        const ws = WaveSurfer.create({
            container: waveformRef.current ?? '',
            waveColor: '#85ABE8',
            progressColor: '#3c79d9',
            height: 28,
            cursorWidth: 0,
            barGap: 1,
            barRadius: 12,
            normalize: true,
        });

        wavesurferRef.current = ws;
        ws.load(src);

        ws.on('ready', () => {
            setDuration(formatTime(ws.getDuration()));
        });

        ws.on('audioprocess', () => {
            if (ws.isPlaying()) {
                setCurrentTime(formatTime(ws.getCurrentTime()));
            }
        });

        ws.on('finish', () => {
            setIsPlaying(false);
            setCurrentTime('00:00');
        });

        return () => ws.destroy();
    }, [src]);

    const handlePlayClick = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
            setIsPlaying(wavesurferRef.current.isPlaying());
        }
    };

    return (
        <div className={styles['audio']}>
            <button
                className={styles['audio__button']}
                type="button"
                onClick={handlePlayClick}
            >
                {isPlaying ? (
                    // TODO: add pause ICON
                    '❚❚'
                ) : (
                    <PlayIcon className={styles['audio__button-icon']} />
                )}
            </button>
            <div className={styles['audio__info']}>
                <div
                    className={styles['audio__wave']}
                    ref={waveformRef}
                    style={{ flex: 1 }}
                />
                <span className={styles['audio__duration']}>{duration}</span>
            </div>
        </div>
    );
}

function formatTime(sec: number) {
    if (!sec) return '00:00';

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${s.toString().padStart(2, '0')}`;
}

export default memo(Audio);
