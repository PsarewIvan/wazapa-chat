import { memo } from 'react';

type Props = {
    className?: string;
};

function SenderCorner({ className }: Props) {
    return (
        <svg
            className={className}
            fill="none"
            height="16"
            viewBox="0 0 12 16"
            width="12"
        >
            <path
                d="m0 16h9.03733c2.63417 0 3.95337-3.1503 2.09077-4.9927l-11.1281-11.00729905z"
                fill="currentColor"
            />
        </svg>
    );
}

export default memo(SenderCorner);
